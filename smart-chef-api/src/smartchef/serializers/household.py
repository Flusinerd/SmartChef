from rest_framework import serializers

from ..models import HouseholdStock, User
from ..models.household import Household
from .resource import ResourceSerializer
from .stock import HouseholdStockSerializer


class HouseholdSerializer(ResourceSerializer):
    users = serializers.SlugRelatedField(
        slug_field='id', many=True, queryset=User.objects.all())

    owner = serializers.SlugRelatedField(
        slug_field='id', queryset=User.objects.all())

    # Load related household stocks
    def to_representation(self, instance):
        data = super(HouseholdSerializer, self).to_representation(instance)
        data['stock'] = HouseholdStockSerializer(
            HouseholdStock.objects.filter(household=instance), many=True).data
        return data

    def create(self, validated_data):
        # Check if the context is set
        if 'request' in self.context:
            validated_data['owner'] = self.context['request'].user
        return super(HouseholdSerializer, self).create(validated_data)

    def update(self, instance, validated_data):
        if 'users' in validated_data:
            validated_data['users'].append(self.context['request'].user)
        return super(HouseholdSerializer, self).update(instance, validated_data)

    class Meta:
        model = Household
        fields = ('id', 'createdAt', 'updatedAt',
                  'name', 'owner', 'users')

        # users field is optional
        extra_kwargs = {
            'users': {'required': False}
        }
