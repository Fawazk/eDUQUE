import json
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.permissions import AllowAny,IsAuthenticated
from rest_framework.views import APIView
from . serializers import InstructorSerializer
from rest_framework import generics
from rest_framework.parsers import FormParser, MultiPartParser


class InstructorView(generics.CreateAPIView):
    serializer_class = InstructorSerializer
    parser_classes = [MultiPartParser, FormParser]
    # permission_classes=[IsAuthenticated]
    def post(self, request):
        print(request.data)
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        instructor=serializer.save()
        print(serializer.data)
        return Response({
            "cource":InstructorSerializer(instructor,context=self.get_serializer_context()).data,
            'message':'course successfully added'
        })
