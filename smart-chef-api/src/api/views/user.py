from rest_framework import viewsets
from api.models.user import User
from api.serializers.user import UserSerializer
from rest_framework import mixins, viewsets
from rest_framework.decorators import action


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-createdAt')
    serializer_class = UserSerializer
