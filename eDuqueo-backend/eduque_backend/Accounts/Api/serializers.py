from rest_framework import serializers
# from django.contrib.auth.models import User
from Accounts.models import Account

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = "__all__"
    
    def validate_password(self,value):
        if len(value)<4:
            raise serializers.ValidationError("Password must be minimum 4 characters")
        else:
            return value
    def save(self):
        reg = Account(
            email=self.validated_data['email'],
            username=self.validated_data['username'],
        )
        password=self.validated_data['password']
        reg.set_password(password)
        reg.save()
        return reg
# class social_LoginSerialize(serializers.ModelSerializer):
#     class Meta:
#         model = Account
#         fields = ["email"]
        
    