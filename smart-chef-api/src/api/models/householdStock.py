from django.db import models
from api.models.household import Household
from api.models.product import Product


class HouseholdStock:
    """
    Stock of a household for a product.
    """
    household: Household = models.ForeignKey(
        Household, on_delete=models.PROTECT, primary_key=True)
    product: Product = models.ForeignKey(
        Product, on_delete=models.PROTECT, primary_key=True)
    actual: float = models.FloatField()
    target: float = models.FloatField()
