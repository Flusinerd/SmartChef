from django.db import models
import uuid


class Application(models.Model):
    """
    An OAuth2 application
    """
    client_id: str = models.UUIDField(
        primary_key=True, default=uuid.uuid4, editable=False)
    redirect_uri: str = models.CharField(max_length=500)
    client_secret: str = models.CharField(max_length=255)
    name: str = models.CharField(max_length=255)

    class Meta:
        ordering = ['client_id']
