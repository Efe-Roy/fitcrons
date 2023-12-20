from django.http import Http404
from django.core.mail import send_mail, EmailMessage
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework import generics
from .models import Exercise, GymActivity, WeekDay
from .serializers import ExerciseSerializer, GymActivitySerializer, WeekDaySerializer
from Auth.models import User

# Create your views here.
class ListCreateUpdate(APIView):
    
    def get(self, request, pk, format=None):
        user = User.objects.get(id=pk)
        queryset = WeekDay.objects.filter(user=user)
        serializer = WeekDaySerializer(queryset, many=True)
        return Response(serializer.data)

    def post(self, request, pk, *args, **kwargs):
        data = request.data.get('formData', [])
        user = User.objects.get(id=pk)

        # Validate data format
        if not isinstance(data, list):
            return Response({'error': 'Invalid data format'}, status=status.HTTP_400_BAD_REQUEST)

        # Create WeekDay instances and associated objects dynamically
        week_days_instances = []
        for week_day_data in data:
            week_day_instance = WeekDay(user=user, week_days=week_day_data.get('week_days', ''))
            week_day_instance.save()

            for activity_data in week_day_data.get('gym_activities', []):
                gym_activity_instance = GymActivity(muscule_group=activity_data.get('muscule_group', ''))
                gym_activity_instance.save()

                for exercise_data in activity_data.get('nestedArray', []):
                    exercise_instance = Exercise(
                        exercise=exercise_data.get('exercise', ''),
                        element=exercise_data.get('element', ''),
                        weight=exercise_data.get('weight', ''),
                        data_s=exercise_data.get('data_s', ''),
                        data_r=exercise_data.get('data_r', ''),
                        data_d=exercise_data.get('data_d', ''),
                        principle=exercise_data.get('principle', ''),
                        seg=exercise_data.get('seg', ''),
                        rir=exercise_data.get('rir', ''),
                    )
                    exercise_instance.save()
                    gym_activity_instance.nestedArray.add(exercise_instance)

                week_day_instance.gym_activities.add(gym_activity_instance)

            week_days_instances.append(week_day_instance)

        serialized_data = WeekDaySerializer(week_days_instances, many=True)
        return Response(serialized_data.data, status=status.HTTP_201_CREATED)
    
    def put(self, request, pk, *args, **kwargs):
        user = User.objects.get(id=pk)
        week_day_data_list = request.data
        

        for week_day_data in week_day_data_list:
            week_day_id = week_day_data.get('id')
            week_days = week_day_data.get('week_days')

            # Fetch WeekDay instances using authenticated user and week_day_id
            week_day_instances = WeekDay.objects.filter(user=user, id=week_day_id)

            print("week_day_instances", week_day_instances)
            for week_day_instance in week_day_instances:
                week_day_instance.week_days = week_days
                week_day_instance.save()

            if not week_day_instances.exists():
                # return Response({'message': 'WeekDay not found for the user'}, status=status.HTTP_404_NOT_FOUND)
                week_day_instance = WeekDay.objects.create(user=user, week_days=week_days)

            # Update nested GymActivities and Exercises
            for gym_activity_data in week_day_data.get('gym_activities', []):
                gym_activity_id = gym_activity_data.get('id')
                muscule_group = gym_activity_data.get('muscule_group')

                gym_activity_instance, created = GymActivity.objects.get_or_create(id=gym_activity_id)
                gym_activity_instance.muscule_group = muscule_group
                gym_activity_instance.save()

                # Update nested Exercises
                nested_array_data = gym_activity_data.get('nestedArray', [])

                for exercise_data in nested_array_data:
                    exercise_id = exercise_data.get('id')

                    exercise_instance, created = Exercise.objects.get_or_create(id=exercise_id)
                    exercise_instance.exercise = exercise_data.get('exercise')
                    exercise_instance.element = exercise_data.get('element')
                    exercise_instance.weight = exercise_data.get('weight')
                    exercise_instance.data_s = exercise_data.get('data_s')
                    exercise_instance.data_r = exercise_data.get('data_r')
                    exercise_instance.data_d = exercise_data.get('data_d')
                    exercise_instance.principle = exercise_data.get('principle')
                    exercise_instance.seg = exercise_data.get('seg')
                    exercise_instance.rir = exercise_data.get('rir')
                    exercise_instance.save()

                    # Add the Exercise to the GymActivity
                    gym_activity_instance.nestedArray.add(exercise_instance)

                # Add the GymActivity to the WeekDay
                week_day_instance.gym_activities.add(gym_activity_instance)

        return Response({'message': 'Data updated successfully'}, status=status.HTTP_200_OK)
    

class ExerciseDeleteAPIView(APIView):
    def delete(self, request, exercise_id, *args, **kwargs):
        try:
            exercise_instance = Exercise.objects.get(id=exercise_id)
            exercise_instance.delete()
            return Response({'message': 'Exercise deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
        except Exercise.DoesNotExist:
            return Response({'error': 'Exercise not found'}, status=status.HTTP_404_NOT_FOUND)
        
class WeekDayDeleteAPIView(APIView):
    def delete(self, request, week_day_id, *args, **kwargs):
        try:
            week_day_instance = WeekDay.objects.get(id=week_day_id)
            week_day_instance.delete()
            return Response({'message': 'WeekDay deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
        except WeekDay.DoesNotExist:
            return Response({'error': 'WeekDay not found'}, status=status.HTTP_404_NOT_FOUND)

class GymActivityDeleteAPIView(APIView):
    def delete(self, request, gym_activity_id, *args, **kwargs):
        try:
            gym_activity_instance = GymActivity.objects.get(id=gym_activity_id)
            gym_activity_instance.delete()
            return Response({'message': 'GymActivity deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
        except GymActivity.DoesNotExist:
            return Response({'error': 'GymActivity not found'}, status=status.HTTP_404_NOT_FOUND)