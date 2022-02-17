from django.contrib import admin
from django.urls import path,include
from . import views

urlpatterns = [    
    path('api/admin/courses',views.CoursesView.as_view(),name='courses'),
    path('api/admin/modify_course/<int:id>/',views.ModifyCourseView.as_view(),name='modify_course'),
    path('api/admin/GetCourse_TaskView/<int:id>/',views.GetCourse_TaskView.as_view(),name='GetCourse_TaskView'),
    path('api/admin/modify_task/<int:id>/',views.ModifyTaskView.as_view(),name='ModifyTaskView'),
    path('api/admin/task/',views.TaskView.as_view(),name='task'),
    path('api/admin/Question',views.QuestionView.as_view(),name='question'),
    path('api/admin/modify_Question/<int:id>/',views.ModifyQuestionView.as_view(),name='modify_question'),
]