from smartchef.api.models.user import User
from smartchef.api.serializers.resource import ResourceSerializer
from django.contrib.auth.hashers import make_password


class UserSerializer(ResourceSerializer):

    # Override create method to set the user's password
    def create(self, validated_data):
        validated_data['password'] = make_password(validated_data['password'])
        return super(UserSerializer, self).create(validated_data)

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
