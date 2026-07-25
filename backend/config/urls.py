from django.contrib import admin
from django.urls import path, include
from django.http import JsonResponse

def home_view(request):
    return JsonResponse({
        "name": "UICRAFTED DESIGN Backend API",
        "status": "online",
        "author": "Bose AM",
        "endpoints": {
            "admin": "/admin/",
            "reviews": "/api/reviews/",
            "stats": "/api/stats/",
            "contact": "/api/contact/"
        }
    })

urlpatterns = [
    path('', home_view, name='home'),
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
]
