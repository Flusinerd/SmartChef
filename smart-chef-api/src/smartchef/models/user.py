from django.db import models
from . import Resource


class User(Resource):
    """
    A user of the system.
    """
    email: str = models.EmailField(unique=True)
    password: str = models.CharField(max_length=255)
    firstName: str = models.CharField(max_length=255)
    lastName: str = models.CharField(max_length=255)
