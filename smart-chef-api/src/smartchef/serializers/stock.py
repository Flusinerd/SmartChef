from rest_framework import serializers

from ..models import HouseholdStock
from .product import ProductSerializer


class HouseholdStockSerializer(serializers.ModelSerializer):
    # Load related product name and id
    product = ProductSerializer(read_only=True)

    class Meta:
        model = HouseholdStock
        fields = ('product', 'actual', 'target')


class UpdateStockSerializer(serializers.ModelSerializer):
    productId = serializers.CharField()
    quantity = serializers.IntegerField()

    class Meta:
        model = HouseholdStock
        fields = ('quantity', 'productId')
