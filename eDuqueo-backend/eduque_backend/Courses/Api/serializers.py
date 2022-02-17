from rest_framework import serializers
# from django.contrib.auth.models import User
from Courses.models import Courses,Task,Questions

class CoursesSerializer(serializers.ModelSerializer):
    courseimage=serializers.ImageField(max_length=None,use_url=True)
    class Meta:
        model = Courses
        fields = "__all__"
        
class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = "__all__"

class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Questions
        fields = "__all__"

