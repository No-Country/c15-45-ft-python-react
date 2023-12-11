from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.
class User(AbstractUser):
    email = models.EmailField(max_length=254, unique=True)
    owner = models.BooleanField(default=False)
    adress_street = models.CharField(max_length=32)
    adress_number = models.CharField(max_length=8)
    adress_zip = models.CharField(max_length=8)
    adress_state = models.CharField(max_length=16)
    adress_country = models.CharField(max_length=16)

class Category(models.Model):
    name = models.CharField(max_length=16,primary_key=True)

class Shop(models.Model):
    user = models.OneToOneField(User, on_delete=models.PROTECT, related_name='shop', primary_key=True)
    description = models.TextField(blank=True)
    shop_name = models.CharField(max_length=16)
    logo = models.ImageField(null=True, blank=True, upload_to="images/shops")
    adress_street = models.CharField(max_length=32)
    adress_number = models.CharField(max_length=8)
    adress_zip = models.CharField(max_length=8)
    adress_state = models.CharField(max_length=16)
    adress_country = models.CharField(max_length=16)
    category = models.ForeignKey(Category,related_name='shops',on_delete=models.PROTECT, null=True)

class Product(models.Model):
    shop = models.ForeignKey(Shop, on_delete=models.PROTECT, related_name='products', null=True)
    titulo = models.CharField(max_length=32)
    description = models.TextField(blank=True)
    stock = models.IntegerField(default=0)
    price = models.IntegerField(default=0)
    sells = models.IntegerField(default=0)
    category = models.ManyToManyField(Category)

class ProductImages(models.Model):
    image = models.ImageField(null=True, blank=True, upload_to="images/products")
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='product_images', null=True)
    
class OrderRequest(models.Model):
    user = models.ForeignKey(User,on_delete=models.PROTECT,related_name='orders')
    producto = models.ForeignKey(Product, on_delete=models.PROTECT, related_name='orders')
    quantity = models.IntegerField(default=1)

    def total(self):
        return self.quantity * self.producto.price


class ShoppingCart(models.Model):
    user = models.OneToOneField(User, on_delete=models.PROTECT, related_name='shopping_cart', primary_key=True)
    orders = models.ManyToManyField(OrderRequest, related_name='shopping_cart')
   
    def get_subtotal(self):
        return sum([order.total() for order in self.orders.all()])


class Purchase(models.Model):
    timestamp = models.DateTimeField(auto_now_add=True)
    total = models.IntegerField()
    user = models.ForeignKey(User, on_delete=models.PROTECT, related_name='purchases')
    orders = models.ManyToManyField(OrderRequest, related_name='purchases')
