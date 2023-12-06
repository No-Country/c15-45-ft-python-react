from django.http import HttpResponse, HttpResponseRedirect
from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django.shortcuts import render
from django.urls import reverse
from django.http import JsonResponse
from django import forms
from .models import User
# Create your views here.
class RegisterForm(forms.Form):
    username = forms.CharField(label="Your username", max_length=100)
    password = forms.CharField(widget=forms.PasswordInput())
    confirmation = forms.CharField(widget=forms.PasswordInput())
    email = forms.EmailField(label="Your email", max_length=254)
    adress_street = forms.CharField(label="Your adress street", max_length=32)
    adress_number = forms.CharField(label="Your adress number" ,max_length=8)
    adress_zip = forms.CharField(label="Your zip" ,max_length=8)
    adress_state = forms.CharField(label="Your adress state" ,max_length=16)
    adress_country = forms.CharField(label="Your adress country" ,max_length=16)

def index(request):
    return render(request, "ecommerce/index.html")

def login_view(request):
    if request.method == "POST":

        # Attempt to sign user in
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
        else:
            return render(request, "ecommerce/login.html", {
                "message": "Invalid username and/or password."
            })
    else:
        return render(request, "ecommerce/login.html")

def register(request):
    if request.method == "POST":
        form = RegisterForm(request.POST)
        if form.is_valid():
            username = form.cleaned_data["username"]
            email = form.cleaned_data["email"]
            adress_street = form.cleaned_data["adress_street"]
            adress_number = form.cleaned_data["adress_number"]
            adress_zip = form.cleaned_data["adress_zip"]
            adress_state = form.cleaned_data["adress_state"]
            adress_country = form.cleaned_data["adress_country"]
        # Ensure password matches confirmation
        password = form.cleaned_data["password"]
        confirmation = form.cleaned_data["confirmation"]
        if password != confirmation:
            return render(request, "ecommerce/register.html", {
                "message": "Passwords must match."
            })

        # Attempt to create new user
        try:
            print(username)
            user = User.objects.create_user(
                username,
                email=email,
                password=password,
                adress_street=adress_street,
                adress_number=adress_number,
                adress_zip=adress_zip,
                adress_state=adress_state,
                adress_country=adress_country,
                )
            
            user.save()
        except IntegrityError:
            return render(request, "ecommerce/register.html", {
                "message": "Username already taken."            })
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "ecommerce/register.html", {
            "form": RegisterForm()
        })
    
def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))