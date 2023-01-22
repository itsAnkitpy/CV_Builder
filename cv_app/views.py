from django.shortcuts import render

def index(request):
    return render(request, 'cv_app/index.html')

def registerView(request):
    return render(request, 'cv_app/registration/register.html')

def loginView(request):
    return render(request, 'cv_app/registration/login.html')  
