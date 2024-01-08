from django.urls import path, include
from .views import (
    CustomAuthToken, UserListView, UserDetail, 
    OTPVerificationView, MemberListView,
    RequestPasswordResetEmail, PasswordTokenCheckAPI,
    SetNewPasswordAPIView, SignupView, LogoutView, CreateOperatorView
)

urlpatterns = [
    path('login/', CustomAuthToken.as_view(), name ='auth-token'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('userlist/', UserListView.as_view()),
    path('memberlist/', MemberListView.as_view()),
    path('register/', SignupView.as_view()),
    path('register-member/', CreateOperatorView.as_view()),
    path('me/<str:pk>/', UserDetail.as_view()),

    path('verify-otp/', OTPVerificationView.as_view(), name='verify-otp'),
 
    # path('delmem', MemberDelete.as_view()),

    path('request-reset-email/', RequestPasswordResetEmail.as_view(), name="request-reset-email"),
    path('password-reset/<uidb64>/<token>/', PasswordTokenCheckAPI.as_view(), name='password-reset-confirm'),
    path('password-reset-complete', SetNewPasswordAPIView.as_view(), name='password-reset-complete')
]

