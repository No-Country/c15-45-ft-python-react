from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render
from django.urls import reverse
from django.http import JsonResponse

# Create your views here.

def index(request):
    return JsonResponse({'hola': 'mundo','no-store-behind':'proyecto ganador'})