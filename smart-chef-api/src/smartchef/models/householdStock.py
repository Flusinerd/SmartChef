from django.db import models
import smartchef.models.household as HouseholdModel
import smartchef.models.product as ProductModel


class HouseholdStock(models.Model):
    """
    Stock of a household for a product.
    """
    household: HouseholdModel.Household = models.ForeignKey(
        HouseholdModel.Household, on_delete=models.PROTECT)
    product: ProductModel.Product = models.ForeignKey(
        ProductModel.Product, on_delete=models.PROTECT)
    actual: float = models.FloatField()
    target: float = models.FloatField()

    class Meta:
        unique_together = (('household', 'product'),)
