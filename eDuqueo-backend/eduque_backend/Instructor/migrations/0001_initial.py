# Generated by Django 4.0.1 on 2022-02-14 06:04

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('Courses', '0007_alter_courses_description'),
    ]

    operations = [
        migrations.CreateModel(
            name='Instrucor',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=15)),
                ('phone', models.CharField(max_length=10)),
                ('aboutyou', models.TextField(max_length=1000, null=True)),
                ('coverletter', models.TextField(max_length=1000, null=True)),
                ('experiance', models.IntegerField(default=0)),
                ('linkdinlink', models.URLField()),
                ('githublink', models.URLField()),
                ('twitterlink', models.URLField()),
                ('uploadphoto', models.ImageField(null=True, upload_to='media/images/Instructors')),
                ('uploadcv', models.ImageField(null=True, upload_to='media/images/Instructors')),
                ('is_insturctor', models.BooleanField(default=False)),
                ('date_joined', models.DateTimeField(auto_now_add=True)),
                ('selectCourse', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Courses.courses')),
            ],
        ),
    ]