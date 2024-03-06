from django.contrib.auth.models import User
from django.http import JsonResponse, HttpResponseForbidden
from django.utils.decorators import method_decorator
from django.views import View
from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.views.decorators.csrf import ensure_csrf_cookie


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


# Main pages

class IndexView(View):

    @method_decorator(ensure_csrf_cookie)
    def get(self, request):
        tokens = get_tokens(request)
        user = get_user(request)
        model = {'title': 'Django with Webpack and Babel'}

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


class OverviewView(View):

    def get(self, request):
        tokens = get_tokens(request)
        user = get_user(request)
        model = {'title': 'Django with Webpack and Babel'}

        if user is None:
            return redirect('index')

        context = {
            'title': 'Text To Speech Web App - Overview',
            'element_id': 'overview',
            'contains_form': True,
            'view_model': {
                'tokens': tokens,
                'user': user,
                'model': model
            }
        }

        return render(request, 'page.html', context)


# User management pages

class RegisterView(View):
    def post(self, request, *args, **kwargs):
        user = get_user(request)

        if user is not None:
            return redirect('index')

        username = request.POST.get('username')
        password = request.POST.get('password')
        email = request.POST.get('email')

        # Perform your own validation and error handling here

        user = User.objects.create_user(username=username, password=password, email=email)

        return redirect('index')


class LoginView(View):

    def post(self, request, *args, **kwargs):
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

    def get(self, request, *args, **kwargs):
        tokens = get_tokens(request)
        user = get_user(request)

        if not user:
            return redirect('index')

        model = {'title': 'Django with Webpack and Babel'}
        context = {
            'title': 'Text To Speech Web App - Overview',
            'element_id': 'add',
            'contains_form': True,
            'view_model': {
                'tokens': tokens,
                'user': user,
                'model': model
            }
        }

        return render(request, 'page.html', context)

    def post(self, request, *args, **kwargs):
        tokens = get_tokens(request)
        user = get_user(request)

        if not user:
            return redirect('index')

        audio_file = request.FILES.get("recording")

        if audio_file:
            # Save the audio file (change path and filename as needed)
            with open(f"uploads/{audio_file.name}", "wb") as file:
                for chunk in audio_file.chunks():
                    file.write(chunk)

            return JsonResponse({"message": "Audio uploaded successfully!"})
        else:
            return JsonResponse({"error": "No audio file uploaded!"}, status=400)


# Transcription pages

class EditTranscriptionView(View):

    def get(self, request, transcription_id, *args, **kwargs):
        tokens = get_tokens(request)
        user = get_user(request)

        if not user:
            return redirect('index')

        model = {'title': 'Django with Webpack and Babel'}
        context = {
            'title': 'Text To Speech Web App - Overview',
            'element_id': 'edit',
            'contains_form': True,
            'view_model': {
                'tokens': tokens,
                'user': user,
                'model': model
            }
        }

        return render(request, 'page.html', context)


class RemoveTranscriptionView(View):

    def get(self, request, transcription_id, *args, **kwargs):
        tokens = get_tokens(request)
        user = get_user(request)

        if not user:
            return redirect('index')

        return JsonResponse(
            status=200,
            data={'message': transcription_id}
        )
