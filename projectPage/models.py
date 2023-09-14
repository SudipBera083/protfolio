from django.db import models

class Repository(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    url = models.URLField()

    def __str__(self):
        return self.name
