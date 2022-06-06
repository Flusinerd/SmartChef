from typing import List
from .resource import Resource
import smartchef.models.user as UserModel
import smartchef.models.householdStock as HouseholdStockModel
from django.db import models


class Household(Resource):
    """
    A household of users.
    """
    name: str = models.CharField(max_length=255)
    users: List[UserModel.User] = models.ManyToManyField('User')
    owner: UserModel.User = models.ForeignKey(
        UserModel.User, on_delete=models.CASCADE, related_name='households')

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
