from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='home'),
    path('dashboard/', views.dashboard, name="dashboard"),
    path('createcv/', views.createCv, name="createcv"),
    path('skill-save/', views.saveSkill, name="skill-save"),

    path('register/', views.registerView, name="register"),
    path('login/', views.loginView, name="login"),
]