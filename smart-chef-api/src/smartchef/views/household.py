from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from ..models import Household
from ..serializers import UpdateStockSerializer
from ..serializers.household import HouseholdSerializer


class HouseholdViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows Households to be viewed or edited.
    """
    queryset = Household.objects.all().order_by('-createdAt')
    serializer_class = HouseholdSerializer
    permission_classes = []

    # Endpoint for updating the household's stock
    @action(detail=True, methods=['patch'], url_path='stock')
    def update_stock(self, request, pk=None):
        print("Updating stock")
        household: Household = self.get_object()
        serializer = self.get_serializer(household)

        # Serialize the body of the request
        data = request.data
        print(data)
        stockSerializer = UpdateStockSerializer(data=data, many=True)
        stockSerializer.is_valid(raise_exception=True)

        print("Updating stock", stockSerializer.validated_data)
        # Iterate over the stock items and update the stock
        for stock in stockSerializer.validated_data:
            household.update_stock(stock['productId'], stock['quantity'])

        return Response(serializer.data)
