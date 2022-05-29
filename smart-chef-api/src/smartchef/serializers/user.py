import smartchef.serializers.household as HouseholdSerializer
from django.contrib.auth.hashers import make_password
from django.db.transaction import atomic
from rest_framework import serializers

from ..models import User
from .resource import ResourceSerializer


class UserSerializer(ResourceSerializer):

    households = serializers.SlugRelatedField(
        slug_field='id', many=True, read_only=True)

    # Override update method to set the user's password

    def update(self, instance, validated_data):
        if 'password' in validated_data:
            validated_data['password'] = make_password(
                validated_data['password'])
        return super(UserSerializer, self).update(instance, validated_data)

    class Meta:
        model = User
        fields = ('id', 'firstName', 'lastName',
                  'createdAt', 'updatedAt', 'password', 'email', 'households')
        extra_kwargs = {
            'password': {'write_only': True},
        }


class CreateUserSerializer(UserSerializer):
    # Override create method to set the user's password
    @atomic
    def create(self, validated_data):
        validated_data['password'] = make_password(validated_data['password'])
        createdUser: User = super(UserSerializer, self).create(validated_data)
        # Create household for user with him as the owner and add him to the users list
        household_data = {
            'name': f"{createdUser.firstName}'s Haushalt",
            'owner': createdUser.id,
            'users': [createdUser.id]
        }
        household_serializer = HouseholdSerializer.HouseholdSerializer(
            data=household_data)
        household_serializer.is_valid(raise_exception=True)
        household_serializer.save()
        return createdUser

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
