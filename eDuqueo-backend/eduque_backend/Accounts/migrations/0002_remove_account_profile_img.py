# Generated by Django 4.0.1 on 2022-01-26 05:23

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('Accounts', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='account',
            name='profile_img',
        ),
    ]