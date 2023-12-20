from rest_framework import serializers
from .models import Exercise, GymActivity, WeekDay

class ExerciseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Exercise
        fields = '__all__'

class GymActivitySerializer(serializers.ModelSerializer):
    nestedArray = ExerciseSerializer(many=True)

    class Meta:
        model = GymActivity
        fields = '__all__'

class WeekDaySerializer(serializers.ModelSerializer):
    gym_activities = GymActivitySerializer(many=True)

    class Meta:
        model = WeekDay
        fields = '__all__'
