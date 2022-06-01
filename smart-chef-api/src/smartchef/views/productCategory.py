from rest_framework import viewsets

from ..serializers import ProductCategorySerializer
from ..models import ProductCategory


class ProductCategoryViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows Products to be viewed or edited.
    """

    queryset = ProductCategory.objects.all().order_by('parent_id')
    permission_classes = []
    serializer_class = ProductCategorySerializer
