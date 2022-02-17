import json
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.permissions import AllowAny,IsAdminUser
from rest_framework.views import APIView
from . serializers import UserSerializer

# customizing token claims
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
# 

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        data = super().get_token(user)
        data['email'] = user.email
        data['username'] = user.username
        data['is_admin'] = user.is_admin
        return data
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

class Register(APIView):
    permission_classes=[AllowAny]
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.validated_data)
        else:
            return Response(serializer.errors)
        
        
        
        
        
        
# class SocialMediaLogin(APIView):
#     def post(request,*args, **kwargs):
#         data = {}
#         reqBody = json.loads(request.Body)
#         email1 = reqBody['email']
#         print('r----------',email1)
#         try:
#             Account = Account.objects.get(email=email1)
#         except BaseException as e:
#             raise ValidationError({"400": f'{str(e)}'})

#         token = Token.objects.get_or_create(user=Account)[0].key

#         if Account:
#             if Account.is_active:
#                 print('r----------',request.user)
#                 login(request, Account)
#                 data["message"] = "user logged in"
#                 data["email"] = Account.email

#                 Res = {"data": data, "token": token}

#                 return Response(Res)

#             else:
#                 raise ValidationError({"400": f'Account not active'})

#         else:
#             raise ValidationError({"400": f'Account doesnt exist'})
            
