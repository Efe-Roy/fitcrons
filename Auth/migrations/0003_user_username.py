# Generated by Django 3.2.22 on 2023-10-30 22:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Auth', '0002_auto_20231030_1304'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='username',
            field=models.CharField(blank=True, default='', max_length=255),
        ),
    ]
