from .resource import ResourceSerializer
from ..models import Product


class ProductSerializer(ResourceSerializer):
    class Meta:
        model = Product
        fields = ('id', 'createdAt', 'updatedAt', 'gtin', 'name', 'description', 'amount', 'unit')
        