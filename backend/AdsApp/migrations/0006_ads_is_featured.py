# Generated by Django 5.1.4 on 2024-12-30 17:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('AdsApp', '0005_ads_cost'),
    ]

    operations = [
        migrations.AddField(
            model_name='ads',
            name='is_featured',
            field=models.BooleanField(default=False),
        ),
    ]
