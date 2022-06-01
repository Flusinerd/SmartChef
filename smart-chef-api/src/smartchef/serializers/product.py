from asyncore import read
from unicodedata import category
from ..models import Product, ProductManufacturer, ProductCategory
from rest_framework import serializers
from .resource import ResourceSerializer
from .productCategory import ProductCategorySerializer


class ProductSerializer(ResourceSerializer):
    # Override the create method to create the manufacturere if it doesn't exist
    def create(self, validated_data):
        manufacturer_name = validated_data.pop('manufacturer')
        manufacturer, _ = ProductManufacturer.objects.get_or_create(
            name=manufacturer_name)
        validated_data['manufacturer'] = manufacturer

        return super().create(validated_data)

    manufacturer = serializers.CharField(required=False, write_only=True)
    category = ProductCategorySerializer(read_only=True)
    category_id = serializers.UUIDField(write_only=True)

    class Meta:
        model = Product
        fields = ('id', 'createdAt', 'updatedAt', 'gtin',
                  'name', 'description', 'amount', 'unit', 'manufacturer', 'category', 'category_id')
