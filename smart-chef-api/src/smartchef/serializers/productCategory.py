from rest_framework import serializers
from ..models import ProductCategory
from .resource import ResourceSerializer


class ProductCategorySerializer(ResourceSerializer):

    parent = serializers.SlugRelatedField(
        slug_field='id',
        queryset=ProductCategory.objects.all(),
        required=False,
    )

    class Meta:
        model = ProductCategory
        fields = ('id', 'createdAt', 'updatedAt', 'name', 'parent')
