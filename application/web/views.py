from django.views import View
from django.shortcuts import render


class IndexView(View):

    def get(self, request):
        user = {'id': 1, 'name': 'User_1'}
        model = {'title': 'Django with Webpack and Babel'}

        context = {
            'element_id': 'index',
            'view_model': {'user': user, 'model': model}
        }
        return render(request, 'page.html', context)
