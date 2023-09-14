from django.contrib import admin
from .models import BioModel, AddressModel, AchievementsModel, ProjectsModel
# Register your models here.


admin.site.register(BioModel)
admin.site.register(AddressModel)
admin.site.register(AchievementsModel)
admin.site.register(ProjectsModel)