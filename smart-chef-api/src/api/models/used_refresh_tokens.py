from datetime import datetime
from django.db import models


class UsedRefreshTokens(models.Model):
    refresh_token: str = models.CharField(
        max_length=255, primary_key=True, editable=False)
    expires_at: datetime = models.DateTimeField()

    class Meta:
        ordering = ['refresh_token']
