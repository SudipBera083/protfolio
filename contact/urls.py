from django.contrib import admin
from django.urls import path, include
from . import views


app_name = "contact"
urlpatterns = [
    path('', views.contact_view , name ="contact"),
    path('contact/success/', views.contact_success_view, name='contact_success'),
   
]
