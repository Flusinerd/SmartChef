from django.db import models
import api.models.household as HouseholdModel
import api.models.product as ProductModel


class HouseholdStock:
    """
    Stock of a household for a product.
    """
    household: HouseholdModel.Household = models.ForeignKey(
        HouseholdModel.Household, on_delete=models.PROTECT, primary_key=True)
    product: ProductModel.Product = models.ForeignKey(
        ProductModel.Product, on_delete=models.PROTECT, primary_key=True)
    actual: float = models.FloatField()
    target: float = models.FloatField()
