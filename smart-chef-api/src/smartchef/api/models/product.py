from smartchef.api.models.resource import Resource
from django.db import models
from smartchef.api.shared.unit_enum import UnitEnum
from smartchef.api.models.productCategory import ProductCategory
import smartchef.api.models.productManufacturer as productManufacturerModel


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
    category: ProductCategory = models.ForeignKey(
        ProductCategory, on_delete=models.PROTECT, null=False)
    manufacturer: productManufacturerModel.ProductManufacturer = models.ForeignKey(
        productManufacturerModel.ProductManufacturer, on_delete=models.PROTECT, null=True)
