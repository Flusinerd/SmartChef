import datetime
import uuid
from django.db import models


class Resource(models.Model):
    id: str = models.UUIDField(
        primary_key=True, default=uuid.uuid4, editable=False)
    createdAt: datetime = models.DateTimeField(auto_now_add=True)
    updatedAt: datetime = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['id']
        abstract = True
