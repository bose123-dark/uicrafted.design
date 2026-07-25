from django.contrib import admin
from django.urls import path, include, re_path
from django.shortcuts import render
from django.conf import settings
from django.conf.urls.static import static
from django.views.static import serve
import os

def frontend_home(request):
    return render(request, 'index.html')

urlpatterns = [
    path('', frontend_home, name='home'),
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
    re_path(r'^(?P<path>.*)$', serve, {'document_root': settings.BASE_DIR.parent}),
]
