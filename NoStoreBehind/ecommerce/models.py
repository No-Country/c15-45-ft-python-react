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
    #logo = models.ImageField()
    adress_street = models.CharField(max_length=32)
    adress_number = models.CharField(max_length=8)
    adress_zip = models.CharField(max_length=8)
    adress_state = models.CharField(max_length=16)
    adress_country = models.CharField(max_length=16)
    category = models.ForeignKey(Category,related_name='shops',on_delete=models.PROTECT, null=True)

class ProductImages(models.Model):
    image = models.CharField(max_length=16)
    
    # se podrian añadir las imagenes mediante url de la siguiente manera}
    # image_url = models.URLField()
    
    # o el usuario las podria subir a la pagina y estas se guardarian en una carpeta media en la db solo la url a esta 
    # para esto se tendrian que hacer unos pequeños ajustes en settings y crear una carpeta media ("es facil")
    # imagen = models.ImageField(upload_to='comercios/')
    
    shop = models.ForeignKey(Shop,related_name='images',on_delete=models.PROTECT, null=True)


class Product(models.Model):
    shop = models.ForeignKey(Shop, on_delete=models.PROTECT, related_name='products', null=True)
    titulo = models.CharField(max_length=32)
    description = models.TextField(blank=True)
    stock = models.IntegerField(default=0)
    price = models.IntegerField(default=0)
    sells = models.IntegerField(default=0)
    category = models.ManyToManyField(Category)
    images = models.ManyToManyField(ProductImages)

class OrderRequest(models.Model):
    producto = models.ForeignKey(Product, on_delete=models.PROTECT, related_name='orders')
    quantity = models.IntegerField(default=1)
    price = models.IntegerField()


class ShoppingCart(models.Model):
    user = models.OneToOneField(User, on_delete=models.PROTECT, related_name='shopping_cart', primary_key=True)
    timestamp = models.DateTimeField(auto_now_add=True)
    subtotal = models.IntegerField(default=0)
    orders = models.ForeignKey(OrderRequest, on_delete=models.PROTECT, related_name='shopping_cart')


class Purchase(models.Model):
    timestamp = models.DateTimeField(auto_now_add=True)
    total = models.IntegerField()
    user = models.ForeignKey(User, on_delete=models.PROTECT, related_name='purchases')
    shopping_cart = models.OneToOneField(ShoppingCart, on_delete=models.PROTECT, primary_key=True)