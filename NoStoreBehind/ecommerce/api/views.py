from rest_framework import generics, permissions
from django.contrib.auth import authenticate, login, logout
from rest_framework.response import Response
from rest_framework.views import APIView
from ..models import *
from .serializers import *

class LoginView(APIView):
    def post(self, request, format=None):
        username = request.data.get("username")
        password = request.data.get("password")
        user = authenticate(username=username, password=password)
        if user is not None:
            login(request, user)
            return Response(UserSerializer(user).data)
        else:
            return Response({"error": "Wrong Credentials"}, status=400)
class LogoutView(APIView):
    def post(self, request, format=None):
        logout(request)
        return Response({"success": "Successfully logged out"})



class UserListCreateView(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class UserDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class CategoryListCreateView(generics.ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class CategoryDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class ShopListCreateView(generics.ListCreateAPIView):
    queryset = Shop.objects.all()
    serializer_class = ShopSerializer

class ShopDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Shop.objects.all()
    serializer_class = ShopSerializer

class ProductListCreateView(generics.ListCreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

class ProductDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

class OrderRequestListCreateView(generics.ListCreateAPIView):
    queryset = OrderRequest.objects.all()
    serializer_class = OrderRequestSerializer

class OrderRequestDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = OrderRequest.objects.all()
    serializer_class = OrderRequestSerializer

class ShoppingCartDetailView(generics.RetrieveUpdateAPIView):
    queryset = ShoppingCart.objects.all()
    serializer_class = ShoppingCartSerializer

class PurchaseListCreateView(generics.ListCreateAPIView):
    queryset = Purchase.objects.all()
    serializer_class = PurchaseSerializer

class PurchaseDetailView(generics.RetrieveAPIView):
    queryset = Purchase.objects.all()
    serializer_class = PurchaseSerializer