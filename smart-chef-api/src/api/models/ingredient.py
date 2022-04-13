from django.db import models
from api.models.resource import Resource
from api.shared import unit_enum
import api.models.productCategory as productCategoryModel


class Ingredient(Resource):
    """
    An ingredient for a recipe.
    """
    amount: float = models.FloatField()
    unit: unit_enum.UnitEnum = models.CharField(
        max_length=255, choices=unit_enum.UnitEnum.choices())
    product: models.ForeignKey(
        productCategoryModel.ProductCategory, on_delete=models.PROTECT, null=False)
