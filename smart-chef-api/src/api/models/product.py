from api.models.resource import Resource
from django.db import models
from api.shared.unit_enum import UnitEnum


class Product(Resource):
    """
    A concrete product with barcode etc.
    """
    gtin: str = models.CharField(max_length=13, unique=True, null=True)
    name: str = models.CharField(max_length=255)
    description: str = models.TextField(max_length=1000, null=True)
    amount: float = models.FloatField()
    unit: UnitEnum = models.CharField(
        max_length=255, choices=UnitEnum.choices())
