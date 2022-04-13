from rest_framework import serializers
from api.models.resource import Resource


class ResourceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Resource
        fields = ('id', 'createdAt', 'updatedAt')
        read_only_fields = ('id', 'createdAt', 'updatedAt')
