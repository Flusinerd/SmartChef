import string
from rest_framework import viewsets
from ..models import Product
from ..serializers.product import ProductSerializer
from drf_spectacular.utils import extend_schema, OpenApiParameter


class ProductViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows Products to be viewed or edited.
    """

    permission_classes = []

    serializer_class = ProductSerializer

    @extend_schema(
        parameters=[
            OpenApiParameter(name='gtin', location=OpenApiParameter.QUERY,
                             description='gtin', required=False, type=string),
        ],
    )

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def get_queryset(self):
        queryset = Product.objects.all().order_by('-createdAt')
        gtin = self.request.query_params.get('gtin')

        if gtin is not None:
            queryset = queryset.filter(gtin = gtin)

        return queryset
