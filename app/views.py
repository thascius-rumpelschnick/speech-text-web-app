from django.shortcuts import render


def index(request):
    context = {
        'element_id': 'index',
        'view_model': {'name': 'World'}
    }
    return render(request, 'page.html', context)
