from django.shortcuts import render
from django.http import HttpResponse
# Create your views here.
from .models import Repository

def project(request):
    repositories = Repository.objects.all()
    return render(request, 'projects/repository_list.html', {'repositories': repositories})
    # return HttpResponse("Thank you for visiting the projects")