from rest_framework import viewsets
from rest_framework import permissions
from rest_framework.schemas.openapi import AutoSchema
from api.models.user import User
from api.serializers.user import PrivateUserSerializer, UserSerializer


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-createdAt')
    serializer_class = UserSerializer


class PrivateUserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-createdAt')
    serializer_class = PrivateUserSerializer

    # To avoid duplicate operation IDs in the OpenAPI schema
    schema = AutoSchema(operation_id_base="private_user")
