from ..models import Product
from .resource import ResourceSerializer


class ProductSerializer(ResourceSerializer):
    class Meta:
        model = Product
        fields = ('id', 'createdAt', 'updatedAt', 'gtin',
                  'name', 'description', 'amount', 'unit')
