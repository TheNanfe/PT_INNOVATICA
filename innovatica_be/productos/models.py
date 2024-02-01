from django.db import models


# Create your models here.
class Producto(models.Model):
    nombre = models.CharField(max_length=200)
    estado = models.CharField(max_length=50)
    categoria = models.CharField(max_length=50)
    imagen = models.TextField()
