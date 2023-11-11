from django.urls import path

from application.web.views import IndexView

urlpatterns = [
    path('', IndexView.as_view(), name='index'),
]
