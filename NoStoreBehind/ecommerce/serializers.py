from rest_framework import serializers
from .models import *

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class ShopSerializer(serializers.ModelSerializer):
    class Meta:
        model = Shop
        fields = '__all__'

class ProductImagesSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImages
        fields = '__all__'

class ProductSerializer(serializers.ModelSerializer):
    category = CategorySerializer(many=True)  # Se usa el serializador de Category para representar las relaciones
    product_images = ProductImagesSerializer(many=True, read_only=True)

    class Meta:
        model = Product
        fields = '__all__'

class OrderRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderRequest
        fields = '__all__'

class ShoppingCartSerializer(serializers.ModelSerializer):
    orders = OrderRequestSerializer(many=True, read_only=True)

    class Meta:
        model = ShoppingCart
        fields = '__all__'

class PurchaseSerializer(serializers.ModelSerializer):
    orders = OrderRequestSerializer(many=True, read_only=True)

    class Meta:
        model = Purchase
        fields = '__all__'
