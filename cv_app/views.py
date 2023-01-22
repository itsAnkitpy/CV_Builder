from django.shortcuts import render,redirect
from django.contrib.auth.hashers import make_password
from django.contrib import messages,auth
from django.contrib.auth import authenticate,logout
from django.contrib.auth.decorators import login_required 

from .models import User

def index(request):
    return render(request, 'cv_app/index.html')

def registerView(request):
    if request.method == 'POST':
        username = request.POST['username']
        email = request.POST['email']
        password = request.POST['password']
        password = make_password(password)

        check_user = User.objects.filter(username=username).count()
        check_email = User.objects.filter(email=email).count()

        if(check_user > 0):
            messages.error(request, 'Username is already taken')
            return redirect('register')
        elif(check_email > 0):
            messages.error(request, 'Email is already taken')
            return redirect('register')
        else:
            User.objects.create(username=username, email=email, password=password)
            messages.success(request, 'Account created successfully, Please Sign In')
            return redirect('login')
    else:
        return render(request, 'cv_app/registration/register.html')  
    

def loginView(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(request, username=username, password=password)
        if user is not None and user.is_active:
            auth.login(request, user)
            return redirect('dashboard')
        else:
            messages.error(request, 'Invalid Username or Password')
            return redirect('login')

    return render(request, 'cv_app/registration/login.html')

def dashboard(request):
    return render(request, 'cv_app/dashboard.html')

def createCv(request):
    return render(request, 'cv_app/create_cv.html')  
     
