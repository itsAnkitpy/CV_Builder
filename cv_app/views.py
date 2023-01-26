from django.shortcuts import render,redirect
from django.contrib.auth.hashers import make_password
from django.contrib import messages,auth
from django.contrib.auth import authenticate,logout
from django.contrib.auth.decorators import login_required 
from django.http import JsonResponse

from .models import User,Skill

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

def saveSkill(request):
    if request.method == 'POST':
        
        s_name = request.POST.getlist('s_name[]')
        s_level = request.POST.getlist('s_level')
        
        if(len(s_name) == 1):
            a = Skill(s_name = s_name[0], s_level=s_level[0], cv_id=1)
            a.save()
            
        
        else: 
            for x,y in zip(s_level,s_name):
                a = Skill(s_level=x, s_name=y, cv_id=1)
                a.save()
        return JsonResponse('1')

    return JsonResponse('0')

        
        
        
    
                 
     
