
from django.contrib import admin
from django.urls import path, include
from . import views

app_name = "profilePage"


urlpatterns = [
    path('', views.index , name ="ProfileHome"),
    path("profileView/", views.profile_view, name ="profileView")
   
]
