from api.models.household import Household
from rest_framework import serializers


class HouseholdSerializer(serializers.ModelSerializer):
    class Meta:
        model = Household
        fields = ('id', 'createdAt', 'updatedAt', 'name', 'users', 'owner')
