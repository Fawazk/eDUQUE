from rest_framework import serializers
# from django.contrib.auth.models import User
from Instructor.models import Instructor

class InstructorSerializer(serializers.ModelSerializer):
    uploadphoto=serializers.ImageField(max_length=None,use_url=True)
    uploadcv=serializers.FileField(max_length=None,use_url=True)
    class Meta:
        model = Instructor
        fields = "__all__"