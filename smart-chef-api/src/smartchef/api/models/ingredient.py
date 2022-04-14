from django.db import models
from smartchef.api.models.resource import Resource
from smartchef.api.shared import unit_enum
from .productCategory import ProductCategory
from .recipe import Recipe


class Ingredient(Resource):
    """
    An ingredient for a recipe.
    """
    amount: float = models.FloatField()
    unit: unit_enum.UnitEnum = models.CharField(
        max_length=255, choices=unit_enum.UnitEnum.choices())
    product: ProductCategory = models.ForeignKey(
        ProductCategory, on_delete=models.PROTECT, null=False)
    recipe: Recipe = models.ForeignKey(
        Recipe, on_delete=models.PROTECT, null=False)
