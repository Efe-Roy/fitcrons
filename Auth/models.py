import uuid

from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, UserManager
from django.db import models
from django.utils import timezone


class CustomUserManager(UserManager): 
    def _create_user(self, name, email, password, **extra_fields):
        if not email:
            raise ValueError("You have not provided a valid e-mail address")
        
        email = self.normalize_email(email)
        user = self.model(email=email, name=name, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)

        return user
    
    def create_user(self, name=None, email=None, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_superuser', False)
        return self._create_user(name, email, password, **extra_fields)
    
    def create_superuser(self, name=None, email=None, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self._create_user(name, email, password, **extra_fields)


class User(AbstractBaseUser, PermissionsMixin):
    MEMBER = 'member'
    TRAINER = 'trainer'

    ROLES_CHOICES = (
        (MEMBER, 'member'),
        (TRAINER, 'trainer'),
    )
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email = models.EmailField(unique=True)
    name = models.CharField(max_length=255, blank=True, default='')
    gender=models.CharField(max_length=25, null=True, blank=True)
    phone=models.CharField(max_length=25, null=True, blank=True)
    age = models.PositiveIntegerField(null=True, blank=True)
    calories = models.PositiveIntegerField(null=True, blank=True)
    height = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    weight = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    factor = models.DecimalField(max_digits=5, decimal_places=3, null=True, blank=True)
    not_sure = models.BooleanField(default=False)
    objective = models.CharField(max_length=50, null=True, blank=True)
    comment=models.TextField(null=True, blank=True)
    role = models.CharField(max_length=20, choices=ROLES_CHOICES, default=MEMBER)
    otp_code = models.CharField(max_length=6, null=True, blank=True)

    is_active = models.BooleanField(default=True)
    is_superuser = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)

    date_joined = models.DateTimeField(default=timezone.now)
    last_login = models.DateTimeField(blank=True, null=True)

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    EMAIL_FIELD = 'email'
    REQUIRED_FIELDS = ['name']
    
