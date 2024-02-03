from django.urls import path
from .views import *

urlpatterns = [
     path('create_user/', create_user, name='create_user'),
     path('get_all_users/', get_all_users, name='get_all_users'),
     path('update_status/', update_status, name='update_status')
]