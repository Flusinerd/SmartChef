from typing import List
from .resource import Resource
import smartchef.models.householdStock as HouseholdStockModel
from django.db import models


class Household(Resource):
    """
    A household of users.
    """
    name: str = models.CharField(max_length=255)
    users = models.ManyToManyField('User')
    owner = models.ForeignKey(
        'User', on_delete=models.CASCADE, related_name='households')

    def delete(self):
        """
        Delete this household.
        """
        # Delete all stock items in this household
        stock_items = HouseholdStockModel.HouseholdStock.objects.filter(household=self)
        for stock_item in stock_items.all():
            stock_item.delete()
        # Delete the household
        super().delete()

    def update_stock(self, product_id: int, quantity: int):
        """
        Update the stock of a product in this household.
        """
        # Get the stock item for this product
        try:
            stock_item = HouseholdStockModel.HouseholdStock.objects.get(
                household=self, product_id=product_id)
            stock_item.actual += quantity
            stock_item.save()
        except HouseholdStockModel.HouseholdStock.DoesNotExist:
            # Create a new stock item if it doesn't exist
            stock_item = HouseholdStockModel.HouseholdStock(
                household=self, product_id=product_id, actual=quantity, target=quantity)
            stock_item.save()
