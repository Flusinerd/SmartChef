from typing_extensions import Self
from uuid import uuid4
from django.db import models
from .resource import Resource


class ProductCategory(Resource):
    id: uuid4 = models.UUIDField(primary_key=True, default=uuid4)
    name: str = models.CharField(max_length=255)
    parent: Self = models.ForeignKey("self", on_delete=models.CASCADE)

    class Meta:
        ordering = ['name']
