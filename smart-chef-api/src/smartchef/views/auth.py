from typing import List
import jwt
from rest_framework.viewsets import ViewSet
from rest_framework.response import Response
from rest_framework.decorators import action
from ..serializers import AuthSerializer, RefreshSerializer
from ..models import User, Household, Application, UsedRefreshTokens
from ..shared import AccessToken, RefreshToken
from django.contrib.auth.hashers import check_password
from jwt import encode, decode
from datetime import datetime, timedelta


class AuthViewSet(ViewSet):
    serializer_class = AuthSerializer

    @action(detail=False, methods=['POST'], url_path='login')
    def get_token_pair(self, request):
        """
        Generates a new access and refresh token pair for the user
        """
        email = request.data['email']
        password = request.data['password']
        application_id = request.data['applicationId']
        print(email, password)
        try:
            user: User = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response({'error': 'Email or password is incorrect'}, status=400)
        try:
            application: Application = Application.objects.get(
                client_id=application_id)
        except Application.DoesNotExist:
            return Response({'error': 'Application does not exist'}, status=400)
        # Verify password
        passwordMatches = check_password(
            password, user.password)
        if passwordMatches == False:
            return Response({'error': 'Email or password is incorrect'}, status=400)
        # Generate token pair
        households: List[Household] = user.households.all()
        householdIds = [household.id for household in households]
        sub = user.id.__str__()
        return self.generateTokenPair(application, householdIds, sub)

    @action(detail=False, methods=['POST'], url_path='refresh', serializer_class=RefreshSerializer)
    def refresh_token(self, request):
        """
        Generates a new token pair using the refresh token
        """
        # Check if the refresh token is valid
        refreshToken = request.data['refresh_token']
        decoded: RefreshToken = decode(
            refreshToken, algorithms=['HS256'], options={'verify_signature': False})
        try:
            expires = datetime.fromtimestamp(decoded['exp'])
            # Check if the refresh token has expired
            if expires < datetime.now():
                return Response({'error': 'Refresh token has expired'}, status=400)

            # Check if the refresh token has been used before
            usedRefreshTokens = UsedRefreshTokens.objects.filter(
                refresh_token=refreshToken)
            if usedRefreshTokens.count() > 0:
                return Response({'error': 'Refresh token has been used before'}, status=400)
        except:
            return Response({'error': 'Refresh token is invalid'}, status=400)

        # Verify the client id and signature
        try:
            application: Application = Application.objects.get(
                client_id=decoded['clientId'])
            # Verify the token using the client secret
            decode(refreshToken, application.client_secret,
                   algorithms=['HS256'])
        except jwt.InvalidSignatureError:
            return Response({'error': 'Refresh token is invalid'}, status=400)
        except Application.DoesNotExist:
            return Response({'error': 'Application does not exist'}, status=400)

        # Generate new token pair
        sub = decoded['sub']
        user: User = User.objects.get(id=sub)
        households: List[Household] = user.households.all()
        householdIds = [household.id for household in households]
        response = self.generateTokenPair(application, householdIds, sub)
        # Add the refresh token to the list of used refresh tokens
        try:
            UsedRefreshTokens.objects.create(
                refresh_token=refreshToken, expires_at=expires)
            return response
        except:
            return Response({'error': 'Error refreshing the token, try again'}, status=500)

    def generateTokenPair(self, application: Application, householdIds: List[str], sub: str):
        """
        Generates a new access and refresh token pair for the user
        Returns:
            Response: The response with the new token pair
        """
        expAccessToken = datetime.now() + timedelta(minutes=20)
        expRefreshToken = datetime.now() + timedelta(days=90)
        accessToken = encode({
            'sub': sub,
            'householdIds': householdIds,
            'exp': int(expAccessToken.timestamp())
        }, application.client_secret, algorithm='HS256')
        refreshToken = encode({
            'sub': sub,
            'exp': int(expRefreshToken.timestamp()),
            'clientId': application.client_id.__str__()
        }, application.client_secret, algorithm='HS256')
        return Response({
            'accessToken': accessToken,
            'refreshToken': refreshToken,
        })
