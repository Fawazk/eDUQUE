from django.contrib import admin
from django.urls import path,include
from . import views

urlpatterns = [    
    path('api/instructor',views.InstructorView.as_view(),name='instructor'),
    ]