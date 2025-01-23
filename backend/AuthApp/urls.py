from django.urls import path
from .views import *

urlpatterns = [
    path('send-otp/', SendOTPView.as_view(), name='send_otp'),
    path('register/', RegisterView.as_view(), name="register"),
    path('login/', LoginView.as_view(), name='mobile_login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('login-user/', LogInUserView.as_view(), name='is_loggedin'),
    path('update-profile-pic/', UpdateProfilePicView.as_view(), name='update-profile-pic'),
]