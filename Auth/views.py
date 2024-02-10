import random
from datetime import timedelta
from django.utils import timezone
from django.http import Http404
from django.core.mail import send_mail
from django.conf import settings
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.encoding import smart_str, force_str, smart_bytes, DjangoUnicodeDecodeError
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from rest_framework import generics, status
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import AllowAny, IsAuthenticated
from .serializers import (
    UserSerializer, SignupSerializer, OperatorSignUpSerializer,
    ResetPasswordEmailRequestSerializer,SetNewPasswordSerializer, MemberUserSerializer
)
from .models import User, MemberUser
from django.core.exceptions import ObjectDoesNotExist

class SignupView(generics.GenericAPIView):
    serializer_class = SignupSerializer
    def post(self, request, *args, **kwargs):
        serializer=self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
    
        return Response({
            "user": SignupSerializer(user, context=self.get_serializer_context()).data,
            "message": "account create successfully"
        })

class CreateOperatorView(generics.GenericAPIView):
    serializer_class = OperatorSignUpSerializer
    def post(self, request, *args, **kwargs):
        coach_user = self.request.user
        serializer=self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        crPass = request.data["password"]
        crEmail = request.data["email"]
        user = serializer.save()

        MemberUser.objects.create(
            user=user,
            coach=coach_user,
            gender= request.data["gender"],
            age= request.data["age"],
            calories= request.data["calories"],
            height= request.data["height"],
            weight= request.data["weight"],
            factor= request.data["factor"],
            not_sure= request.data["not_sure"],
            objective= request.data["objective"],
            comment= request.data["comment"],
        )

        # Generate OTP code
        otp_code = ''.join([str(random.randint(0, 9)) for _ in range(6)])
        user.otp_code = otp_code
        user.save()
        
        # Send activation email
        absurl = 'http://localhost:3000/user/otp'
        email_body = f'Hola, \n Sus credenciales Contraseña: {crPass} y Nombre de usuario: {crEmail} para iniciar sesión.\n  Para activar su cuenta, use este código OTP: {otp_code}, use el enlace a continuación para restablecer su contraseña  \n' + \
            absurl
        data = {'email_body': email_body, 'to_email': user.email,
                'from_email': settings.EMAIL_HOST_USER ,'email_subject': 'Activa tu cuenta'}
        # send_mail(subject=data['email_subject'], message=data['email_body'], from_email=data['from_email'], recipient_list=[data['to_email']])
        
        return Response({
            "user": OperatorSignUpSerializer(user, context=self.get_serializer_context()).data,
            "message": "account create successfully"
        })

class OTPVerificationView(APIView):
    def post(self, request):
        username = request.data.get('username')
        otp_code = request.data.get('otp_code')
        user = User.objects.get(username=username)
        
        if user.otp_code == otp_code:
            user.is_active = True
            user.otp_code = None
            user.save()

            # Send activation email
            subject = 'Activa tu cuenta'
            message = f'Su cuenta ha sido activada, use las credenciales que se le dieron en el correo anterior para iniciar sesión'
            from_email = settings.EMAIL_HOST_USER
            recipient_list = [user.email]
            
            send_mail(subject, message, from_email, recipient_list)

            return Response({'message': 'OTP verified and user account activated.'})
        else:
            return Response({'message': 'Invalid OTP code.'}, status=status.HTTP_400_BAD_REQUEST)

class CustomAuthToken(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data, context={'request':request})
        serializer.is_valid(raise_exception=True)
        user= serializer.validated_data['user']

        if not user.is_active:
            return Response({'message': 'Account is not active.'}, status=status.HTTP_401_UNAUTHORIZED)

        token, created = Token.objects.get_or_create(user=user)
        token.expires = timezone.now() + timedelta(days=1)
        token.save()

        response_data = {
            "token": token.key,
            "user_id": user.pk,
            "role": user.role,
            "name": user.name,
            "email": user.email,
            "token_expires": token.expires,
        }

        return Response(response_data, status=status.HTTP_200_OK)

class LogoutView(APIView):
    def post(self, request, format=None):
        try:
            request.auth.delete()
            return Response({ 'success': 'Loggout Out' })
        except:
            return Response({ 'error': 'Something went wrong when logging out' })
        
class UserDetail(APIView):
    def get_object(self, pk):
        try:
            return User.objects.get(id=pk)
        except User.DoesNotExist:
            raise Http404
        
    def get(self, request, pk, format=None):
        UserById = self.get_object(pk)
        memUser = MemberUser.objects.get(user=UserById)
        memSerializerData = MemberUserSerializer(memUser)
        return Response(memSerializerData.data)
    
    def put(self, request, pk, format=None):
        UserById = self.get_object(pk)
        serializer = UserSerializer(UserById, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CustomPageNumberPagination(PageNumberPagination):
    page_size_query_param = 'PageSize'
    # max_page_size = 100  # Set the maximum page size if needed

class UserListView(generics.ListAPIView):
    permission_classes = (AllowAny,)
    serializer_class = UserSerializer
    # queryset = User.objects.all()
    queryset = User.objects.all().order_by('-date_joined')
    pagination_class = CustomPageNumberPagination

class ChangePasswordView(APIView):
    def post(self, request, *args, **kwargs):
        email = request.data.get('email')
        new_password = request.data.get('new_password')
        
        try:
            user = User.objects.get(email=email)
        except ObjectDoesNotExist:
            return Response({'message': 'User not found with this email.'}, status=status.HTTP_404_NOT_FOUND)

        # Set the new password for the user
        user.set_password(new_password)
        user.save()

        return Response({'message': 'Password successfully changed.'}, status=status.HTTP_200_OK)
    
class MemberListView(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = MemberUserSerializer
    pagination_class = CustomPageNumberPagination

    # queryset = User.objects.filter(is_superuser=False, role='member')
    # queryset = queryset.order_by('-date_joined')
    def get_queryset(self):
        user = self.request.user

        if user.is_authenticated:
            queryset = MemberUser.objects.filter(user__is_superuser=False, user__role='member', coach=user)
        else:
            queryset = MemberUser.objects.none()

        return queryset.order_by('-date_joined')

class RequestPasswordResetEmail(generics.GenericAPIView):
    serializer_class = ResetPasswordEmailRequestSerializer

    def post(self, request):
        email = request.data.get('email', '')

        if User.objects.filter(email=email).exists():
            user = User.objects.get(email=email)
            uidb64 = urlsafe_base64_encode(smart_bytes(user.id))
            token = PasswordResetTokenGenerator().make_token(user)
            absurl2 = 'https://procesosadministrativos.com/reset-password/'+ uidb64 + '/' + token
            email_body = 'Hello, \n Use link below to reset your password  \n' + \
                absurl2
            data = {'email_body': email_body, 'to_email': user.email,
                    'from_email': settings.EMAIL_HOST_USER ,'email_subject': 'Reset your passsword'}
            send_mail(subject=data['email_subject'], message=data['email_body'], from_email=data['from_email'], recipient_list=[data['to_email']])
        return Response({'success': 'We have sent you a link to reset your password'}, status=status.HTTP_200_OK)


class PasswordTokenCheckAPI(generics.GenericAPIView):
    serializer_class = SetNewPasswordSerializer

    def get(self, request, uidb64, token):

        try:
            id = smart_str(urlsafe_base64_decode(uidb64))
            user = User.objects.get(id=id)

            if not PasswordResetTokenGenerator().check_token(user, token):
                return Response({'error': 'Token is not valid, please request a new one'}, status=status.HTTP_400_BAD_REQUEST)
            return Response({'succes': True, 'Message': 'Credential Valid', 'uid64': uidb64, 'token': token}, status=status.HTTP_200_OK)

        except DjangoUnicodeDecodeError as identifier:
            if not PasswordResetTokenGenerator().check_token(user):
                return Response({'error': 'Token is not valid, please request a new one'}, status=status.HTTP_400_BAD_REQUEST)
            

class SetNewPasswordAPIView(generics.GenericAPIView):
    serializer_class = SetNewPasswordSerializer

    def patch(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response({'success': True, 'message': 'Password reset success'}, status=status.HTTP_200_OK)