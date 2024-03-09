from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from notes_api import models
from django.utils.translation import gettext_lazy as _
from .forms import CustomUserChangeForm, CustomUserCreationForm


class UserAdmin(BaseUserAdmin):
    ordering = ["email"]
    add_form = [CustomUserCreationForm]
    form = CustomUserChangeForm
    model = models.User
    list_display = ["email", "first_name", "last_name", "is_staff", "is_active"]
    list_display_links = ["email"]
    list_filter = ["email", "first_name", "last_name", "is_staff", "is_active"]
    search_fields = ["email", "first_name", "last_name"]


# Register your models here.
admin.site.register(models.Todo)
admin.site.register(models.User, UserAdmin)