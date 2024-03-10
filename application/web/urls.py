from django.urls import path

from application.web.views import AudioUploadView, DeleteUserView, EditTranscriptionView, IndexView, AboutView, \
    RegisterView, \
    LoginView, LogoutView, DeleteTranscriptionView, SettingsView

urlpatterns = [
    # Main Pages
    path('', IndexView.as_view(), name='index'),
    path('settings', SettingsView.as_view(), name='settings'),
    path('about', AboutView.as_view(), name='about'),

    # User management pages
    path('register', RegisterView.as_view(), name='register'),
    path('login', LoginView.as_view(), name='login'),
    path('logout', LogoutView.as_view(), name='logout'),
    path('delete-user', DeleteUserView.as_view(), name='delete-user'),

    # Transcription Pages
    path('upload', AudioUploadView.as_view(), name='upload'),
    path('edit/<int:transcription_id>', EditTranscriptionView.as_view(), name='edit'),
    path('delete/<int:transcription_id>', DeleteTranscriptionView.as_view(), name='delete'),
]
