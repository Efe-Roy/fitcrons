from rest_framework import serializers
from .models import User, MemberUser
from rest_framework.exceptions import AuthenticationFailed
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.encoding import force_str
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from django.conf import settings
from django.core.mail import send_mail



class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        # fields="__all__"
        exclude = ('password', 'otp_code', 'is_active', 'is_superuser', 'is_staff', 'date_joined', 'last_login', 'groups', 'user_permissions',)

class SignupSerializer(serializers.ModelSerializer):
    password2=serializers.CharField(style={"input_type":"password"}, write_only=True)
    class Meta:
        model=User
        fields=['name','email','password', 'password2', 'role']
        extra_kwargs={
            'password':{'write_only':True}
        }
    
    def save(self, **kwargs):
        user=User(
            name=self.validated_data['name'],
            email=self.validated_data['email'],
            role=self.validated_data['role']
        )
        password=self.validated_data['password']
        password2=self.validated_data['password2']
        if password !=password2:
            raise serializers.ValidationError({"error":"password do not match"})
        user.set_password(password)
        user.save()
        return user


class MemberUserSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField()

    class Meta:
        model = MemberUser
        fields = ['user', 'gender', 'age', 'calories', 'height',
                  'weight', 'factor', 'not_sure', 'objective', 'comment'
                ]
        
    def get_user(self, obj):
        return UserSerializer(obj.user).data
        
class OperatorSignUpSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'name', 'email', 'password', 'role', 'phone']
        extra_kwargs = {
            'password': {'write_only': True}
        }
    
    def save(self, **kwargs):
        email = self.validated_data['email']

        # Check if a user with the provided email already exists
        if User.objects.filter(email=email).exists():
            raise serializers.ValidationError("A user with this email already exists.")

        user = User(
            name=self.validated_data['name'],
            email=email,
            phone=self.validated_data['phone'],
            is_active = False,
        )

        password = self.validated_data['password']
        user.set_password(password)
        user.save()
        return user



class ResetPasswordEmailRequestSerializer(serializers.Serializer):
    email = serializers.EmailField(min_length=2)

    redirect_url = serializers.CharField(max_length=500, required=False)

    class Meta:
        fields = ['email']


class SetNewPasswordSerializer(serializers.Serializer):
    password = serializers.CharField(
        min_length=6, max_length=68, write_only=True)
    token = serializers.CharField(
        min_length=1, write_only=True)
    uidb64 = serializers.CharField(
        min_length=1, write_only=True)

    class Meta:
        fields = ['password', 'token', 'uidb64']

    def validate(self, attrs):
        try:
            password = attrs.get('password')
            token = attrs.get('token')
            uidb64 = attrs.get('uidb64')

            id = force_str(urlsafe_base64_decode(uidb64))
            user = User.objects.get(id=id)
            if not PasswordResetTokenGenerator().check_token(user, token):
                raise AuthenticationFailed('The reset link is invalid', 401)

            user.set_password(password)
            user.save()

            # Send email notification
            subject = 'Notificación de cambio de contraseña'
            message = f'su contraseña ha sido cambiada exitosamente. Contraseña de nueva credencial: {password},   Nombre de usuario: {user.name}'
            from_email = settings.EMAIL_HOST_USER
            recipient_list = [user.email]
            
            send_mail(subject, message, from_email, recipient_list, fail_silently=True)


            return (user)
        except Exception as e:
            raise AuthenticationFailed('The reset link is invalid', 401)
        return super().validate(attrs)
    

