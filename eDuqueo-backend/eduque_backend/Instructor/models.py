from django.db import models
from Courses.models import Courses
from Accounts.models import Account
# Create your models here.


class Instructor(models.Model):
    user = models.OneToOneField(Account, on_delete=models.CASCADE)
    name = models.CharField(max_length=15)
    phone = models.CharField(max_length=10)
    aboutyou = models.TextField(max_length=1000, null=True)
    coverletter = models.TextField(max_length=1000, null=True)
    selectCourse = models.ForeignKey(Courses, on_delete=models.CASCADE)
    experiance = models.IntegerField(default=0)
    linkdinlink = models.URLField(max_length=200)
    githublink = models.URLField(max_length=200)
    twitterlink = models.URLField(max_length=200)
    uploadphoto = models.ImageField(upload_to='media/images/Instructors', null=True)
    uploadcv = models.ImageField(upload_to='media/images/Instructors', null=True)
    is_insturctor = models.BooleanField(default=False)
    date_joined = models.DateTimeField(auto_now_add=True)
