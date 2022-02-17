from django.contrib import admin
from django.urls import path,include
from . import views
from rest_framework_simplejwt.views import (
    TokenRefreshSlidingView,
)

urlpatterns = [
    path('api/token/', views.MyTokenObtainPairView.as_view(), name='token_obtain'),
    path('api/admin/login',views.MyTokenObtainPairView.as_view(), name='admin_login'),
    path('api/token/refresh/', TokenRefreshSlidingView.as_view(), name='token_refresh'),
    # path('api/SocialMediaLogin/',views.SocialMediaLogin.as_view(), name='social_media_login'),
    
    path('api/register/',views.Register.as_view(),name='register'),

]


