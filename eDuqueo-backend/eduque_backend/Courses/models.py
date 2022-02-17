from django.db import models

# Create your models here.


class Courses(models.Model):
    title = models.CharField(max_length=15,unique=True,null=True)
    courseimage = models.ImageField(upload_to='media/images/Courses',null=True)
    description   = models.TextField(max_length=400,null=True)
    price         = models.IntegerField(null=True)
    is_available  = models.BooleanField(default=True)

class Task(models.Model):
    weekTitle=models.TextField(max_length=10)
    weekdiscription=models.TextField(max_length=500,null=True)
    course = models.ForeignKey(Courses,on_delete=models.CASCADE)
     
class Questions(models.Model):
    week = models.ForeignKey(Task,on_delete=models.CASCADE)
    question = models.TextField(max_length=100)