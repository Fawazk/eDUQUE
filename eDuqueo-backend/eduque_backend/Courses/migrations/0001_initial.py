# Generated by Django 4.0.1 on 2022-02-01 11:08

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Courses',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=15)),
                ('course_image', models.ImageField(blank=True, upload_to='images/Courses')),
                ('description', models.TextField(blank=True, max_length=200)),
                ('price', models.IntegerField(null=True)),
                ('is_available', models.BooleanField(default=True)),
            ],
        ),
        migrations.CreateModel(
            name='Task',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('weekTitle', models.TextField(max_length=10, unique=True)),
                ('course', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Courses.courses')),
            ],
        ),
        migrations.CreateModel(
            name='Questions',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('questionDecription', models.TextField(max_length=500)),
                ('question', models.TextField(max_length=100)),
                ('week', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Courses.task')),
            ],
        ),
    ]
