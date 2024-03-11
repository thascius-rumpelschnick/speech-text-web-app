import logging

from django.contrib.auth.models import User
from django.http import HttpResponseBadRequest, JsonResponse, HttpResponseForbidden
from django.utils.decorators import method_decorator
from django.views import View
from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.views.decorators.csrf import ensure_csrf_cookie

from application.domain.audio_transcription import AudioTranscription, Language, Transcriber
from application.web.models import Setting, Transcription

LOGGER = logging.getLogger(__name__)


def get_user(request):
    if request.user.is_authenticated:
        return {
            'id': request.user.id,  # ToDo: Remove!
            'name': request.user.username
        }
    else:
        return None


def get_tokens(request):
    csrftoken = request.COOKIES['csrftoken'] if 'csrftoken' in request.COOKIES else None
    sessionid = request.COOKIES['sessionid'] if 'sessionid' in request.COOKIES else None

    return {
        'csrftoken': csrftoken,
        'sessionid': sessionid
    }


def convert_from_entity(entity: Transcription):
    transcription = {
        'id': entity.id,
        'content': entity.content,
        'createdAt': entity.created_at,
        'updatedAt': entity.updated_at
    }

    if entity.content_as_html is not None:
        transcription.update({'contentAsHtml': entity.content_as_html})

    return transcription


# Main pages

class IndexView(View):

    @method_decorator(ensure_csrf_cookie)
    def get(self, request):
        tokens = get_tokens(request)
        user = get_user(request)

        transcriptions = []

        if user:
            entities = Transcription.objects.filter(user=request.user).order_by('-created_at')
            transcriptions = [convert_from_entity(entity) for entity in entities]

        model = {'transcriptions': transcriptions}

        context = {
            'title': 'Text To Speech Web App - Index',
            'element_id': 'index',
            'contains_form': True,
            'view_model': {
                'tokens': tokens,
                'user': user,
                'model': model
            }
        }

        return render(request, 'page.html', context)


class SettingsView(View):

    def get(self, request):
        tokens = get_tokens(request)
        user = get_user(request)

        if user is None:
            return redirect('index')

        setting = Setting.objects.filter(user=request.user).get()

        model = {'setting': {'language': setting.language, 'model': setting.model}}

        context = {
            'title': 'Text To Speech Web App - Settings',
            'element_id': 'settings',
            'contains_form': True,
            'view_model': {
                'tokens': tokens,
                'user': user,
                'model': model
            }
        }

        return render(request, 'page.html', context)

    def post(self, request):
        user = get_user(request)

        if user is None:
            return redirect('index')

        setting = Setting.objects.filter(user=request.user).get()

        setting.model = request.POST.get('model')
        setting.language = request.POST.get('language')

        setting.save()

        return JsonResponse(status=200, data={'message': 'Settings updated'})


class AboutView(View):

    def get(self, request):
        tokens = get_tokens(request)
        user = get_user(request)

        context = {
            'title': 'Text To Speech Web App - About',
            'element_id': 'about',
            'contains_form': False,
            'view_model': {
                'tokens': tokens,
                'user': user,
                'model': None
            }
        }

        return render(request, 'page.html', context)


# User management pages

class RegisterView(View):
    def post(self, request):
        user = get_user(request)

        if user is not None:
            return redirect('index')

        username = request.POST.get('username')
        password = request.POST.get('password')
        email = request.POST.get('email')

        if User.objects.filter(username=username).exists():
            return JsonResponse(
                status=HttpResponseForbidden.status_code,
                data={'message': 'User with given username already registered'}
            )

        user = User.objects.create_user(username=username, password=password, email=email)
        Setting.objects.create(user=user, model=Transcriber.WHISPER.name, language=Language.GERMAN.name)

        login(request, user)

        return redirect('index')


class DeleteUserView(View):

    def get(self, request):
        user = get_user(request)

        if user is not None:
            logout(request)

            user = User.objects.get(id=user['id'])
            user.delete()

        return redirect('index')


class LoginView(View):

    def post(self, request):
        user = get_user(request)

        if user is not None:
            return redirect('index')

        username = request.POST.get('username')
        password = request.POST.get('password')
        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)

            return redirect('index')
        else:
            return JsonResponse(
                status=HttpResponseForbidden.status_code,
                data={'message': 'Invalid credentials'}
            )


class LogoutView(View):

    def get(self, request):
        logout(request)

        return redirect('index')


# Audio File Upload

class AudioUploadView(View):

    def get(self, request):
        tokens = get_tokens(request)
        user = get_user(request)

        if not user:
            return redirect('index')

        model = {'title': 'Django with Webpack and Babel'}
        context = {
            'title': 'Text To Speech Web App - Upload',
            'element_id': 'upload',
            'contains_form': True,
            'view_model': {
                'tokens': tokens,
                'user': user,
                'model': model
            }
        }

        return render(request, 'page.html', context)

    def post(self, request):
        user = get_user(request)

        if not user:
            return redirect('index')

        audio = request.FILES.get('audio')

        if audio:
            setting = Setting.objects.get(user=request.user)
            model = setting.model
            language = setting.language

            transcriber = AudioTranscription.get(
                transcriber=Transcriber[model],
                language=Language[language]
            )
            transcription = transcriber.transcribe_to_text(audio)

            entity = Transcription.objects.create(user=request.user, content=transcription)

            return JsonResponse(
                status=201,
                data={'redirectTo': f'/edit/{entity.id}'}
            )
        else:
            return JsonResponse(
                status=HttpResponseBadRequest.status_code,
                data={'message': 'No audio file uploaded!'}
            )


# Transcription pages

class EditTranscriptionView(View):

    def get(self, request, transcription_id):
        tokens = get_tokens(request)
        user = get_user(request)

        if not user or not Transcription.objects.filter(id=transcription_id).exists():
            return redirect('index')

        entity = Transcription.objects.get(id=transcription_id)

        model = {'transcription': convert_from_entity(entity)}

        context = {
            'title': 'Text To Speech Web App - Edit',
            'element_id': 'edit',
            'contains_form': True,
            'view_model': {
                'tokens': tokens,
                'user': user,
                'model': model
            }
        }

        return render(request, 'page.html', context)

    def post(self, request, transcription_id):
        user = get_user(request)

        if not user or not Transcription.objects.filter(id=transcription_id).exists():
            return redirect('index')

        entity = Transcription.objects.get(id=transcription_id)
        entity.content = request.POST.get('content')
        entity.content_as_html = request.POST.get('contentAsHtml')
        entity.save()

        return JsonResponse(
            status=200,
            data={'transcription': convert_from_entity(entity)}
        )


class DeleteTranscriptionView(View):

    def get(self, request, transcription_id):
        user = get_user(request)

        if not user or not Transcription.objects.filter(id=transcription_id).exists():
            return redirect('index')

        entity = Transcription.objects.get(id=transcription_id)
        entity.delete()

        return redirect('index')
