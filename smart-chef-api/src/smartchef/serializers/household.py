from ..models.household import Household
from rest_framework import serializers
from .user import UserSerializer


class HouseholdSerializer(serializers.ModelSerializer):
    class Meta:
        model = Household
        fields = ('id', 'createdAt', 'updatedAt', 'name', 'owner')

        # users field is optional
        extra_kwargs = {
            'users': {'required': False}
        }


class HouseholdUserSerializer(serializers.Serializer):
    userId = serializers.UUIDField(write_only=True)
    users = UserSerializer(many=True, read_only=True)
