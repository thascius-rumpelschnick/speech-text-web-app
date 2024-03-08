from django.urls import path

from application.web.views import AudioUploadView, EditTranscriptionView, IndexView, AboutView, RegisterView, \
    LoginView, LogoutView, RemoveTranscriptionView, SettingsView

urlpatterns = [
    # Main Pages
    path('', IndexView.as_view(), name='index'),
    path('settings', SettingsView.as_view(), name='settings'),
    path('about', AboutView.as_view(), name='about'),

    # User management pages
    path('register', RegisterView.as_view(), name='register'),
    path('login', LoginView.as_view(), name='login'),
    path('logout', LogoutView.as_view(), name='logout'),

    # Transcription Pages
    path('upload', AudioUploadView.as_view(), name='upload'),
    path('edit/<int:transcription_id>', EditTranscriptionView.as_view(), name='edit'),
    path('remove/<int:transcription_id>', RemoveTranscriptionView.as_view(), name='remove'),
]
