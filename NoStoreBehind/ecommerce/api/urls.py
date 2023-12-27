from django.urls import path
from .views import (
    LoginView, LogoutView,
    UserListCreateView, UserDetailView,
    CategoryListCreateView, CategoryDetailView,
    ShopListCreateView, ShopDetailView,
    ProductListCreateView, ProductDetailView,
    OrderRequestListCreateView, OrderRequestDetailView,
    ShoppingCartDetailView,
    PurchaseListCreateView, PurchaseDetailView,
    ProductImagesListCreateView, ProductImagesDetailView
)
urlpatterns = [
    #Login Logout
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    # Rutas para las vistas de User
    path('register/', UserListCreateView.as_view(), name='register'),
    path('user-profile/', UserDetailView.as_view(), name='user-profile'),
    # Rutas para las vistas de Category
    path('categories/', CategoryListCreateView.as_view(), name='category-list-create'),
    path('categories/<str:pk>/', CategoryDetailView.as_view(), name='category-detail'),
    # Rutas para las vistas de Shop
    path('shops/', ShopListCreateView.as_view(), name='shop-list-create'),
    path('shops/<int:pk>/', ShopDetailView.as_view(), name='shop-detail'),
    # Rutas para las vistas de Product
    path('products/', ProductListCreateView.as_view(), name='product-list-create'),
    path('products/<int:pk>/', ProductDetailView.as_view(), name='product-detail'),
    path('products-images/', ProductImagesListCreateView.as_view(), name='add-product-images'),
    # Rutas para las vistas de OrderRequest
    path('orderrequests/', OrderRequestListCreateView.as_view(), name='orderrequest-list-create'),
    path('orderrequests/<int:pk>/', OrderRequestDetailView.as_view(), name='orderrequest-detail'),
    # Ruta para la vista de ShoppingCart
    path('shoppingcart/', ShoppingCartDetailView.as_view(), name='shoppingcart-detail'),
    # Rutas para las vistas de Purchase
    path('purchases/', PurchaseListCreateView.as_view(), name='purchase-list-create'),
    path('purchases/<int:pk>/', PurchaseDetailView.as_view(), name='purchase-detail'),
]
