# Generated by Django 4.0.1 on 2022-02-02 15:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Courses', '0002_remove_courses_course_image_courses_courseimage_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='courses',
            name='is_available',
            field=models.BooleanField(default=True),
        ),
        migrations.AlterField(
            model_name='courses',
            name='price',
            field=models.IntegerField(null=True),
        ),
    ]
