# Generated by Django 4.2.8 on 2023-12-20 10:13

import Auth.models
from django.db import migrations, models
import django.utils.timezone
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('email', models.EmailField(max_length=254, unique=True)),
                ('name', models.CharField(blank=True, default='', max_length=255)),
                ('gender', models.CharField(blank=True, max_length=25, null=True)),
                ('phone', models.CharField(blank=True, max_length=25, null=True)),
                ('age', models.PositiveIntegerField(blank=True, null=True)),
                ('calories', models.PositiveIntegerField(blank=True, null=True)),
                ('height', models.DecimalField(blank=True, decimal_places=2, max_digits=5, null=True)),
                ('weight', models.DecimalField(blank=True, decimal_places=2, max_digits=5, null=True)),
                ('factor', models.DecimalField(blank=True, decimal_places=3, max_digits=5, null=True)),
                ('not_sure', models.BooleanField(default=False)),
                ('objective', models.CharField(blank=True, max_length=50, null=True)),
                ('comment', models.TextField(blank=True, null=True)),
                ('role', models.CharField(choices=[('member', 'member'), ('trainer', 'trainer')], default='member', max_length=20)),
                ('otp_code', models.CharField(blank=True, max_length=6, null=True)),
                ('is_active', models.BooleanField(default=True)),
                ('is_superuser', models.BooleanField(default=False)),
                ('is_staff', models.BooleanField(default=False)),
                ('date_joined', models.DateTimeField(default=django.utils.timezone.now)),
                ('last_login', models.DateTimeField(blank=True, null=True)),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.group', verbose_name='groups')),
                ('user_permissions', models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.permission', verbose_name='user permissions')),
            ],
            options={
                'abstract': False,
            },
            managers=[
                ('objects', Auth.models.CustomUserManager()),
            ],
        ),
    ]
