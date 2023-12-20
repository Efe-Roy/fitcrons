from django.contrib import admin
from .models import Exercise, WeekDay, GymActivity

# Register your models here.

admin.site.register(Exercise)
admin.site.register(WeekDay)
admin.site.register(GymActivity)