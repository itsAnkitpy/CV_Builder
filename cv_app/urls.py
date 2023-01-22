from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='home'),

    path('register/', views.registerView, name="register"),
    path('login/', views.loginView, name="login"),
]