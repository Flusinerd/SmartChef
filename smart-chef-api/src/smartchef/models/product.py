from . import Resource
from django.db import models
from ..shared import UnitEnum
from .productCategory import ProductCategory
import smartchef.models.productManufacturer as productManufacturerModel


class Product(Resource):
    """
    A concrete product with barcode etc.
    """
    # hier nicht noch eine uuid v4?
    gtin: str = models.CharField(max_length=13, unique=True, null=True)
    name: str = models.CharField(max_length=255)
    description: str = models.TextField(max_length=1000, null=True)
    amount: float = models.FloatField()
    unit: UnitEnum = models.CharField(
        max_length=255, choices=UnitEnum.choices())
    category: ProductCategory = models.ForeignKey(
        ProductCategory, on_delete=models.PROTECT, null=False)
    manufacturer: productManufacturerModel.ProductManufacturer = models.ForeignKey(
        productManufacturerModel.ProductManufacturer, on_delete=models.PROTECT, null=True)
