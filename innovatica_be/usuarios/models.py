from django.contrib.auth.models import AbstractUser
from django.db import models

class usuario(AbstractUser):
    # Add your custom fields here
    bio = models.TextField(blank=True)
    birth_date = models.DateField(null=True, blank=True)