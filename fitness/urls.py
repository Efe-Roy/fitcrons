from django.urls import path
from .views import ListCreateUpdate, WeekDayDeleteAPIView, GymActivityDeleteAPIView, ExerciseDeleteAPIView

urlpatterns = [
    path('list-create-update/<pk>/', ListCreateUpdate.as_view()),
    path('weekdays/<int:week_day_id>/delete/', WeekDayDeleteAPIView.as_view()),
    path('gymactivities/<int:gym_activity_id>/delete/', GymActivityDeleteAPIView.as_view()),
    path('exercises/<int:exercise_id>/delete/', ExerciseDeleteAPIView.as_view()),
]
