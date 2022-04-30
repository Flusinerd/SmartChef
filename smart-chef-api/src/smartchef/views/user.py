from rest_framework import viewsets
from ..models.user import User
from ..serializers.user import CreateUserSerializer, UserSerializer
from rest_framework import mixins, viewsets, permissions
from rest_framework.decorators import action


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-createdAt')
    # serializer_class = UserSerializer

    # Disable authentication for this endpoint
    def get_permissions(self):
        if self.action == 'create':
            return [permissions.AllowAny()]
        return [permissions.IsAuthenticated()]

    def create(self, request, *args, **kwargs):
        return super().create(request, *args, **kwargs)

    def get_serializer_class(self):
        if self.action == 'create':
            return CreateUserSerializer
        return UserSerializer
