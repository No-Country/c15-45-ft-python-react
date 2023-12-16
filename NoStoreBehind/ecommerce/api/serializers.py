from rest_framework import serializers
from ..models import *

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
    class Meta:
        model = Product
        fields = '__all__'
    
    def create(self, validated_data):
        categories = validated_data.pop('category')
        product_images = []
        instance = Product.objects.create(**validated_data)
        for category in categories:
            instance.category.add(category)
        for image in product_images:
            instance.product_images.add(image)
        return instance

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

    def create(self, validated_data):
        # Obtén el carrito de compras del usuario
        shopping_cart = ShoppingCart.objects.get(user=self.context['request'].user)

        # Crea una nueva compra
        purchase = Purchase.objects.create(**validated_data)

        # Añade las órdenes del carrito de compras a la compra
        for order in shopping_cart.orders.all():
            purchase.orders.add(order)

        purchase.total = shopping_cart.get_subtotal()
        
        purchase.save()
        
        # Elimina las órdenes del carrito de compras
        shopping_cart.orders.clear()

        return purchase