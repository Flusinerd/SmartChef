from typing import List
from api.models.resource import Resource
from api.models.user import User
from api.models.householdStock import HouseholdStock
from django.db import models


class Household(Resource):
    """
    A household of users.
    """
    name: str = models.CharField(max_length=255)
    users: List[User] = models.ManyToManyField(User)
    owner: User = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='households')
