from django.contrib import admin

from .models import ContactMessage

class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'subject')
    search_fields = ('name', 'email', 'subject')
    list_filter = ('subject',)

admin.site.register(ContactMessage, ContactMessageAdmin)