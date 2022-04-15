from django.db import models
from . import Resource
from ..shared.unit_enum import UnitEnum
import smartchef.models.productCategory as productCategoryModel
import smartchef.models.household as householdModel
import smartchef.models.recipe as recipeModel


class IngredientPurchase(Resource):
    """
    A purchase of ingredients.
    """
    amount: float = models.FloatField()
    unit: UnitEnum = models.CharField(
        max_length=255, choices=UnitEnum.choices())
    product: models.ForeignKey(
        productCategoryModel.ProductCategory, on_delete=models.PROTECT, null=False)
    purchased: bool = models.BooleanField(default=False)
    household = models.ForeignKey(
        householdModel.Household, on_delete=models.PROTECT, null=False)
    recipe = models.ForeignKey(
        recipeModel.Recipe, on_delete=models.PROTECT, null=False)
