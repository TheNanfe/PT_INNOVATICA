from django.urls import path, include
from rest_framework_simplejwt import views as jwt_views
from .views import logout
urlpatterns = [
     path('token/', jwt_views.TokenObtainPairView.as_view(),name ='token_obtain_pair'),
     path('refresh/', jwt_views.TokenRefreshView.as_view(), name ='token_refresh'),
     path('logout/', logout,  name='logout'),
]