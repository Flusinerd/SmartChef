from ..models.user import User
from .resource import ResourceSerializer
from django.contrib.auth.hashers import make_password


class UserSerializer(ResourceSerializer):

    # Override create method to set the user's password
    def create(self, validated_data):
        validated_data['password'] = make_password(validated_data['password'])
        return super(UserSerializer, self).create(validated_data)

    # Override update method to set the user's password
    def update(self, instance, validated_data):
        if 'password' in validated_data:
            validated_data['password'] = make_password(
                validated_data['password'])
        return super(UserSerializer, self).update(instance, validated_data)

    class Meta:
        model = User
        fields = ('id', 'firstName', 'lastName',
                  'createdAt', 'updatedAt', 'password', 'email')
        extra_kwargs = {
            'password': {'write_only': True},
        }


class UpdateUserSerializer(ResourceSerializer):
    class Meta:
        model = User
        fields = ('id', 'firstName', 'lastName', 'password')
        extra_kwargs = {
            'password': {'write_only': True}
        }
