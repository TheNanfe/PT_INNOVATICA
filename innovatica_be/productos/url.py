from django.urls import path
from .views import *

urlpatterns = [
    path('', get_unsigned_products, name='get_unsigned_products'),
    path('all/', get_signed_products, name='get_signed_products'),
    path('get_product_by_filter/', get_product_by_filter, name='get_product_by_filter'),
    path('insert_product/', insert_product, name='insert_product'),
    path('delete_product/<int:pk>', delete_product, name='delete_product'),
    path('update_product/<int:pk>', update_product, name='update_product'),
    path('protected/', protected_view, name='protected-view'),
]
