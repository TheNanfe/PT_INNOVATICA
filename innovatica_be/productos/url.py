from django.urls import path
from .views import *

urlpatterns = [
    path('', get_unsigned_products, name="get_unsigned_products"),
    path('all/', get_signed_products, name="get_signed_products"),
    path('insert_product/', insert_product, name="insert_product"),
]
