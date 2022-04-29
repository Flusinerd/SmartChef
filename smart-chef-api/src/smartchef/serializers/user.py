from ..models import User
from .resource import ResourceSerializer
import smartchef.serializers.household as HouseholdSerializer
from django.contrib.auth.hashers import make_password
from django.db.transaction import atomic


class UserSerializer(ResourceSerializer):

    # Override create method to set the user's password
    @atomic
    def create(self, validated_data):
        validated_data['password'] = make_password(validated_data['password'])
        createdUser: User = super(UserSerializer, self).create(validated_data)
        # Create household for user
        householdSerializer = HouseholdSerializer.HouseholdSerializer(data={
            'name': f"{createdUser.firstName}'s Haushalt",
            'owner': createdUser.id,
            "users": [createdUser.id]
        })
        householdSerializer.is_valid(raise_exception=True)
        householdSerializer.save()
        return createdUser

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
