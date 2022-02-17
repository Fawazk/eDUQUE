# Generated by Django 4.0.1 on 2022-02-02 13:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Courses', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='courses',
            name='course_image',
        ),
        migrations.AddField(
            model_name='courses',
            name='courseimage',
            field=models.ImageField(null=True, upload_to='images/Courses'),
        ),
        migrations.AlterField(
            model_name='courses',
            name='description',
            field=models.TextField(max_length=200, null=True),
        ),
        migrations.AlterField(
            model_name='courses',
            name='is_available',
            field=models.BooleanField(default=True, null=True),
        ),
        migrations.AlterField(
            model_name='courses',
            name='price',
            field=models.IntegerField(max_length=10, null=True),
        ),
        migrations.AlterField(
            model_name='courses',
            name='title',
            field=models.CharField(max_length=15, null=True),
        ),
    ]