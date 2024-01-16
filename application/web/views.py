from django.contrib.auth.models import User
from django.http import JsonResponse, HttpResponseForbidden
from django.views import View
from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout


def get_user(request):
    if request.user.is_authenticated:
        return {
            'id': request.user.id,
            'name': request.user.username
        }
    else:
        return None


# Main pages

class IndexView(View):

    def get(self, request):
        user = get_user(request)
        model = {'title': 'Django with Webpack and Babel'}

        context = {
            'title': 'Text To Speech Web App - Index',
            'element_id': 'index',
            'view_model': {'user': user, 'model': model}
        }

        return render(request, 'page.html', context)


class OverviewView(View):

    def get(self, request):
        user = get_user(request)

        if not user:
            return redirect('index')

        model = {'title': 'Django with Webpack and Babel'}

        context = {
            'element_id': 'overview',
            'view_model': {'user': user, 'model': model}
        }

        return render(request, 'page.html', context)


# User management pages

class RegisterView(View):
    def post(self, request, *args, **kwargs):
        username = request.POST.get('username')
        password = request.POST.get('password')
        email = request.POST.get('email')

        # Perform your own validation and error handling here

        user = User.objects.create_user(username=username, password=password, email=email)

        return redirect('overview')


class LoginView(View):

    def post(self, request, *args, **kwargs):
        username = request.POST.get('username')
        password = request.POST.get('password')
        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)

            return redirect('overview')
        else:
            return JsonResponse(
                status=HttpResponseForbidden.status_code,
                data={'message': 'Invalid credentials'}
            )


class LogoutView(View):

    def get(self, request):
        logout(request)

        return redirect('index')
