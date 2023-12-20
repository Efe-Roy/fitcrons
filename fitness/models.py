from django.db import models
from Auth.models import User


# Create your models here.
class Exercise(models.Model):
    exercise = models.CharField(max_length=255, null=True, blank=True)
    element = models.CharField(max_length=255, null=True, blank=True)
    weight = models.CharField(max_length=255, null=True, blank=True)
    data_s = models.CharField(max_length=255, null=True, blank=True)
    data_r = models.CharField(max_length=255, null=True, blank=True)
    data_d = models.CharField(max_length=255, null=True, blank=True)
    principle = models.CharField(max_length=255, null=True, blank=True)
    seg = models.CharField(max_length=255, null=True, blank=True)
    rir = models.CharField(max_length=255, null=True, blank=True)

class GymActivity(models.Model):
    muscule_group = models.CharField(max_length=255, null=True, blank=True)
    nestedArray = models.ManyToManyField(Exercise)

class WeekDay(models.Model):
    user = models.ForeignKey(User, null=True, blank=True, on_delete=models.SET_NULL)
    week_days = models.CharField(max_length=255, null=True, blank=True)
    gym_activities = models.ManyToManyField(GymActivity)

