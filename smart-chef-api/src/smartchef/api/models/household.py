from typing import List
from .resource import Resource
import smartchef.api.models.user as UserModel
from django.db import models


class Household(Resource):
    """
    A household of users.
    """
    name: str = models.CharField(max_length=255)
    users: List[UserModel.User] = models.ManyToManyField('User')
    owner: UserModel.User = models.ForeignKey(
        UserModel.User, on_delete=models.CASCADE, related_name='households')
