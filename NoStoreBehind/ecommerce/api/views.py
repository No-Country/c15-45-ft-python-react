from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth import login, logout, get_user_model, authenticate
from django.contrib.auth.hashers import make_password
from ..models import *
from .serializers import *
from rest_framework.parsers import MultiPartParser, FormParser

class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, format=None):
        username = request.data.get("username")
        password = request.data.get("password")
        user = authenticate(username=username, password=password)

        if user is not None and user.is_active:

            refresh = RefreshToken.for_user(user)
            access_token = str(refresh.access_token)

            # Utilizar el serializer del usuario para obtener los datos del usuario
            user_serializer = UserSerializer(user, context={'request': request})

            return Response({
                'user': user_serializer.data,
                'access_token': access_token,
                'refresh_token': str(refresh),
            }, status=status.HTTP_200_OK)
        else:
            return Response({
                "error": "Wrong Credentials"}, status=status.HTTP_401_UNAUTHORIZED)

class LogoutView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        logout(request)
        return Response(status=status.HTTP_200_OK)
 
class UserListCreateView(generics.ListCreateAPIView):
    serializer_class = UserSerializer
    permission_classes = [AllowAny]
    
    def get(self, request):
        return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        # Crear el usuario y asignar la contraseña de forma segura
        user = serializer.save()
        user.set_password(request.data['password'])
        user.save()

        login(request, user)

        refresh = RefreshToken.for_user(user)
        access_token = str(refresh.access_token)
        #Create a shopping cart and asign it to the created user
        shopping_cart = ShoppingCart(user=user)
        shopping_cart.save()
        return Response({
            'user': UserSerializer(user, context=self.get_serializer_context()).data,
            'access_token': access_token,
            'refresh_token': str(refresh),
        }, status=status.HTTP_201_CREATED)

class UserDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = UserInfoSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        User = get_user_model()
        return User.objects.filter(pk=self.request.user.pk)

    def get_object(self):
        return self.request.user
    
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

class ProductImagesListCreateView(generics.ListCreateAPIView):
    queryset = ProductImages.objects.all()
    parser_classes = (MultiPartParser, FormParser)
    serializer_class = ProductImagesSerializer
    

class ProductImagesDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = ProductImages.objects.all()
    parser_classes = (MultiPartParser, FormParser)
    serializer_class = ProductImagesSerializer

class OrderRequestListCreateView(generics.ListCreateAPIView):
    queryset = OrderRequest.objects.all()
    serializer_class = OrderRequestSerializer

class OrderRequestDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = OrderRequest.objects.all()
    serializer_class = OrderRequestSerializer

class ShoppingCartDetailView(generics.RetrieveUpdateAPIView):
    permission_classes = [IsAuthenticated]

    queryset = ShoppingCart.objects.all()
    serializer_class = ShoppingCartSerializer
    def get(self, request):
            
            try:
                user = self.request.user
                shopping_cart = user.shopping_cart
                return Response({
                    "shopping_cart":ShoppingCartSerializer(shopping_cart, context=self.get_serializer_context()).data
                })
            except:
                return Response({
                    "shopping cart": "The user doesnt have a shopping cart"
                }, status=status.HTTP_404_NOT_FOUND)

class PurchaseListCreateView(generics.ListCreateAPIView):
    queryset = Purchase.objects.all()
    serializer_class = PurchaseSerializer

    def get(self, request):
        try:
            user = self.request.user
            purchases = Purchase.objects.get(user=user)
            return Response({
                "purchases": PurchaseSerializer(purchases, context=self.get_serializer_context()).data
            })
        except:
            return Response({
                "purchases": "There are not purchases yet"
            }, status=status.HTTP_404_NOT_FOUND)

class PurchaseDetailView(generics.RetrieveAPIView):
    queryset = Purchase.objects.all()
    serializer_class = PurchaseSerializer