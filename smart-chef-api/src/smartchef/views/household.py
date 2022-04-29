from rest_framework import viewsets
from ..models import Household
from ..serializers.household import HouseholdSerializer
from ..serializers import UserSerializer
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.schemas.openapi import AutoSchema
from drf_spectacular.utils import extend_schema, OpenApiParameter, OpenApiExample
from drf_spectacular.types import OpenApiTypes


class HouseholdViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows Households to be viewed or edited.
    """
    queryset = Household.objects.all().order_by('-createdAt')
    serializer_class = HouseholdSerializer
