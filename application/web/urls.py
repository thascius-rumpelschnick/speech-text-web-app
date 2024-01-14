from django.urls import path

from application.web.views import IndexView, OverviewView, RegisterView, LoginView, LogoutView

urlpatterns = [
    path('', IndexView.as_view(), name='index'),
    path('overview', OverviewView.as_view(), name='overview'),
    path('register', RegisterView.as_view(), name='register'),
    path('login', LoginView.as_view(), name='login'),
    path('logout', LogoutView.as_view(), name='logout'),
]
