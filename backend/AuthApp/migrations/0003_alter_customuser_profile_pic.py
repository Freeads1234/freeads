# Generated by Django 5.1.4 on 2025-01-25 18:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('AuthApp', '0002_customuser_profile_pic'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customuser',
            name='profile_pic',
            field=models.ImageField(null=True, upload_to='profile-pic/'),
        ),
    ]