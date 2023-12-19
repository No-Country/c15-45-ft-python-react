from rest_framework import serializers
from ..models import *

class Base64ImageField(serializers.ImageField):
    """
    A Django REST framework field for handling image-uploads through raw post data.
    It uses base64 for encoding and decoding the contents of the file.

    Heavily based on
    https://github.com/tomchristie/django-rest-framework/pull/1268

    Updated for Django REST framework 3.
    """

    def to_internal_value(self, data):
        from django.core.files.base import ContentFile
        import base64
        import six
        import uuid

        # Check if this is a base64 string
        if isinstance(data, six.string_types):
            # Check if the base64 string is in the "data:" format
            if 'data:' in data and ';base64,' in data:
                # Break out the header from the base64 content
                header, data = data.split(';base64,')

            # Try to decode the file. Return validation error if it fails.
            try:
                decoded_file = base64.b64decode(data)
            except TypeError:
                self.fail('invalid_image')

            # Generate file name:
            file_name = str(uuid.uuid4())[:12] # 12 characters are more than enough.
            # Get the file name extension:
            file_extension = self.get_file_extension(file_name, decoded_file)

            complete_file_name = "%s.%s" % (file_name, file_extension, )

            data = ContentFile(decoded_file, name=complete_file_name)

        return super(Base64ImageField, self).to_internal_value(data)

    def get_file_extension(self, file_name, decoded_file):
        import imghdr

        extension = imghdr.what(file_name, decoded_file)
        extension = "jpg" if extension == "jpeg" else extension

        return extension

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class UserInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id","username","email","first_name","last_name","adress_street","adress_number","adress_zip","adress_state","adress_country"]

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'


class ProductImagesSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImages
        fields = '__all__'

class ProductSerializer(serializers.ModelSerializer):
    product_images = ProductImagesSerializer(many=True, read_only=True)
    class Meta:
        model = Product
        fields = '__all__'
    
    def create(self, validated_data):
        print(validated_data)
        categories = validated_data.pop('category')
        instance = Product.objects.create(**validated_data)
        for category in categories:
            instance.category.add(category)
        return instance

class ShopSerializer(serializers.ModelSerializer):
    products = ProductSerializer(many=True, read_only=True)
    class Meta:
        model = Shop
        fields = '__all__'


class OrderRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderRequest
        fields = '__all__'
    def create(self, validated_data):
        order_request = OrderRequest.objects.create(**validated_data)
        order_request.save()

        shopping_cart = ShoppingCart.objects.get(user=self.context['request'].user)
        shopping_cart.orders.add(order_request)
        shopping_cart.save()
        return order_request


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