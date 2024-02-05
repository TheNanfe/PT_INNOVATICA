from django.urls import path, include
from rest_framework_simplejwt import views as jwt_views
from .views import *

urlpatterns = [
     path('token/', custom_login, name='get_token'),
     path('refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
     path('logout/', logout,  name='logout'),
     path('get_current_user/', get_current_user, name='get_current_user'),
]