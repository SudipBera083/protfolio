from django.db import models

# Create your models here.

class BioModel(models.Model):
    bio = models.TextField()

    def __str__(self):
        return self.bio

class AddressModel(models.Model):
    address = models.TextField()

    def __str__(self):
        return self.address


class AchievementsModel(models.Model):
    achievements = models.TextField()

    def __str__(self):
        return self.achievements



class ProjectsModel(models.Model):
    project_name = models.CharField(max_length=100)
    project_desc = models.CharField(max_length=200)
    project_duration = models.CharField(max_length=50)

    def __str__(self):
        return self.project_name


