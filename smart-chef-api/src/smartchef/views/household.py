from rest_framework import viewsets
from ..models import Household
from ..serializers.household import HouseholdSerializer, HouseholdUserSerializer
from ..serializers import UserSerializer
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.schemas.openapi import AutoSchema
from drf_spectacular.utils import extend_schema, OpenApiParameter, OpenApiExample
from drf_spectacular.types import OpenApiTypes


class HouseholdViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows Households to be viewed or edited.
    """
    queryset = Household.objects.all().order_by('-createdAt')
    serializer_class = HouseholdSerializer

    @extend_schema(
        responses=HouseholdUserSerializer,
    )
    @action(detail=True, methods=['GET'])
    def users(self, request, pk=None):
        """
        Returns the users in the household.
        """
        household = self.get_object()
        serializer = UserSerializer(household.users.all(), many=True)
        return Response(serializer.data)

    @extend_schema(
        request=HouseholdUserSerializer,
        responses=HouseholdUserSerializer
    )
    @users.mapping.post
    def add_user(self, request, pk=None):
        """
        Adds a user to the household.
        """
        household: Household = self.get_object()
        user = request.data['userId']
        household.users.add(user)
        household.save()
        serializer = UserSerializer(household.users.all(), many=True)
        return Response(serializer.data)

    @extend_schema(
        parameters=[
            OpenApiParameter(
                name='userId',
                location=OpenApiParameter.PATH,
                type=OpenApiTypes.UUID
            )],
        responses=HouseholdUserSerializer
    )
    @action(detail=True, methods=['DELETE'], url_path='user/(?P<userId>[0-9a-f-]+)')
    def remove_user(self, request, pk=None, userId=None):
        """
        Removes a user from the household.
        """
        household: Household = self.get_object()
        household.users.remove(userId)
        household.save()
        updatedHousehold = Household.objects.get(id=household.id).users.all()
        return Response(updatedHousehold)
