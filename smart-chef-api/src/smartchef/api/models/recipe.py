from django.db import models
from smartchef.api.models.resource import Resource


class Recipe(Resource):
    """
    A recipe for a product.
    """
    name: str = models.CharField(max_length=512)
    description: str = models.TextField(max_length=1000, null=True)
    instruction: str = models.TextField(max_length=10000, null=True)
    url: str = models.URLField(max_length=512, null=True)
    image: models.ImageField(upload_to="recipe_images", null=True)
    stars = models.IntegerField(default=0)
    category = models.ForeignKey(
        "RecipeCategory", on_delete=models.PROTECT, null=False)
