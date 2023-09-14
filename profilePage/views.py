from django.shortcuts import render
from django.http import HttpResponse
from .models import BioModel, AddressModel, AchievementsModel, ProjectsModel

# Create your views here.

def index(request):
    data = BioModel.objects.all()
    projects = ProjectsModel.objects.all()
    return render(request, "profile/profile.html", {"data":data,"projects":projects})

def profile_view(request):
    data = BioModel.objects.all()
    address = AddressModel.objects.all()
    achievements = AchievementsModel.objects.all()
    projects = ProjectsModel.objects.all()

    params = {"data":data, 
        "address":address, 
        "achievements":achievements,
        "projects":projects}


    return render(request, 'profile/profileview.html', params)