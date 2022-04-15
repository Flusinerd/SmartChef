from rest_framework import serializers
from ..models import Resource


class ResourceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Resource
        fields = ('id', 'createdAt', 'updatedAt')
        read_only_fields = ('id', 'createdAt', 'updatedAt')
