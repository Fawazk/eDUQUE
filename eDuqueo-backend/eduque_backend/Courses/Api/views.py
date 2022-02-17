import json
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.permissions import AllowAny,IsAuthenticated,IsAdminUser
from rest_framework.views import APIView

from Courses.models import Courses,Task,Questions
from . serializers import CoursesSerializer,TaskSerializer,QuestionSerializer
from rest_framework import generics
from rest_framework.parsers import FormParser, MultiPartParser


class CoursesView(generics.CreateAPIView):
    serializer_class = CoursesSerializer
    parser_classes = [MultiPartParser, FormParser]
    # permission_classes=[IsAdminUser]
    def post(self, request):
        print(request.data)
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        c=serializer.save()
        print(serializer.data)
        return Response({
            "cource":CoursesSerializer(c,context=self.get_serializer_context()).data,
            'message':'course successfully added'
        })

    def get(self, request):
        courses = Courses.objects.all()
        serializer = CoursesSerializer(courses,many=True,context={'request': request})
        return Response(serializer.data)
class ModifyCourseView(APIView):
    permission_classes =[IsAdminUser]
    def put(self,request,id):
        course = Courses.objects.get(id=id)
        serializer = CoursesSerializer(course,data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors)
    def delete(self,request,id):
        course = Courses.objects.get(id=id)
        course.delete()
        return Response({'message':'Course deleted'})
    
class TaskView(generics.CreateAPIView):
    serializer_class = TaskSerializer
    # permission_classes=[IsAdminUser]
    def post(self, request):
        print(request.data)
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        c=serializer.save()
        return Response({
            "cource":TaskSerializer(c,context=self.get_serializer_context()).data,
            'message':'Task successfully added'
        })
class GetCourse_TaskView(APIView):
    permission_classes =[IsAdminUser]
    def get(self, request,id):
        task = Task.objects.filter(course=id)
        serializer = TaskSerializer(task,many=True,context={'request': request})
        return Response(serializer.data)
    
class ModifyTaskView(APIView):
    permission_classes =[IsAdminUser]
    def get(self, request,id):
        task = Task.objects.filter(id=id)
        serializer = TaskSerializer(task,many=True,context={'request': request})
        return Response(serializer.data)
    def delete(self, request,id):
        task = Task.objects.filter(id=id)
        task.delete()
        return Response({'message':'This task is deleted'})

class QuestionView(generics.CreateAPIView):
    serializer_class = QuestionSerializer
    permission_classes=[IsAdminUser]
    def post(self, request):
        print(request.data)
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        details=serializer.save()
        return Response({
            "Questions":QuestionSerializer(details,context=self.get_serializer_context()).data,
            'message':'Question successfully added',
        })
class ModifyQuestionView(APIView): 
    permission_classes=[IsAdminUser]
    def get(self, request,id):
        questions = Questions.objects.filter(week=id)
        serializer = QuestionSerializer(questions,many=True,context={'request': request})
        return Response(serializer.data)
    def delete(self, request,id):
        question = Questions.objects.filter(id=id)
        question.delete()
        return Response({'message':'Question deleted'})
        
