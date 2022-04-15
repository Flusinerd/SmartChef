from asyncio import exceptions
import os
from rest_framework import authentication
import jwt
from .shared import AccessToken
from .models import User


class BearerAuthentication(authentication.TokenAuthentication):
    keyword = 'Bearer'
    secret = os.getenv('CLIENT_SECRET')

    def authenticate(self, request):
        auth = authentication.get_authorization_header(request).split()
        if not auth or auth[0].lower() != self.keyword.lower().encode():
            return None

        if len(auth) == 1:
            msg = ('Invalid token header. No credentials provided.')
            raise authentication.exceptions.AuthenticationFailed(msg)
        elif len(auth) > 2:
            msg = ('Invalid token header. Token string should not contain spaces.')
            raise authentication.exceptions.AuthenticationFailed(msg)
        try:
            token: AccessToken = jwt.decode(
                auth[1], key=self.secret, algorithms=['HS256'])
            user: User = User.objects.get(id=token['sub'])
            user.is_authenticated = True
        except User.DoesNotExist:
            msg = ('Invalid token header. User does not exist.')
            raise authentication.exceptions.AuthenticationFailed(msg)
        except jwt.exceptions.ExpiredSignatureError:
            msg = ('Invalid token header. Token has expired.')
            raise authentication.exceptions.AuthenticationFailed(msg)
        except jwt.exceptions.InvalidTokenError:
            msg = ('Invalid token header. Token is invalid.')
            raise authentication.exceptions.AuthenticationFailed(msg)
        return (user, token)
