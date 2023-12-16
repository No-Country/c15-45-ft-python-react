from django.contrib import admin
from .models import User, Shop, Category, ProductImages, Product, OrderRequest, ShoppingCart, Purchase
# Register your models here.
admin.site.register(User)
admin.site.register(Shop)
admin.site.register(Category)
admin.site.register(ProductImages)
admin.site.register(Product)
admin.site.register(OrderRequest)
admin.site.register(ShoppingCart)
admin.site.register(Purchase)