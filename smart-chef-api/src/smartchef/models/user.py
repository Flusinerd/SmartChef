from django.db import models
from . import Household
from . import Resource


class User(Resource):
    """
    A user of the system.
    """
    email: str = models.EmailField(unique=True)
    password: str = models.CharField(max_length=255)
    firstName: str = models.CharField(max_length=255)
    lastName: str = models.CharField(max_length=255)
    

    def delete(self):
        """
        Delete this user.
        """
        households = Household.objects.filter(owner=self)
        # Delete all households where this user is the owner
        for household in households.all():
            if household.owner == self:
                household.delete()
        # Delete the user
        super().delete()
