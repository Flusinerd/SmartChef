from rest_framework import viewsets
from api.models.household import Household
from api.serializers.household import HouseholdSerializer


class HouseholdViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows Households to be viewed or edited.
    """
    queryset = Household.objects.all().order_by('-createdAt')
    serializer_class = HouseholdSerializer
