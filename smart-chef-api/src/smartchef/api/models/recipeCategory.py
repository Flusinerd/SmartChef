import imp
from django.db import models
from smartchef.api.models.resource import Resource


class RecipeCategory(Resource):
    """
    A category for recipes.
    """
    name: str = models.CharField(max_length=255)
    image = models.ImageField(upload_to="recipe_category_images", null=True)
    parent: models.ForeignKey("self", on_delete=models.CASCADE, null=True)

    class Meta:
        ordering = ['name']
