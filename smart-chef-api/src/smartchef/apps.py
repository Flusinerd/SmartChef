import os
from django.apps import AppConfig


class ApiConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'smartchef'

    def ready(self):
        from . import jobs

        print("Running jobs")
        jobs.start_scheduler()
