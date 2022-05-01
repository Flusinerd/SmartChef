from rest_framework import viewsets
from django.http import HttpResponse
from ..models.user import User
from ..serializers.user import CreateUserSerializer, UserSerializer
from django.db import IntegrityError
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
        # Return a 409 response if the email is already in use
        try:
            return super().create(request, *args, **kwargs)
        except IntegrityError:
            return HttpResponse(status=409, content={'message': 'Email already in use'})

    def get_serializer_class(self):
        if self.action == 'create':
            return CreateUserSerializer
        return UserSerializer
