from datetime import datetime
from django.db import models
from api.models import Application


class AuthCode(models.Model):
    auth_code: str = models.CharField(
        max_length=255, primary_key=True, editable=False)
    client: Application = models.ForeignKey(
        Application, on_delete=models.PROTECT)
    created_at: datetime = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['auth_code']
