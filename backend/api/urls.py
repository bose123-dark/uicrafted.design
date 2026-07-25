from django.urls import path
from .views import ReviewListCreateView, project_stat_view, ContactInquiryCreateView

urlpatterns = [
    path('reviews/', ReviewListCreateView.as_view(), name='review-list-create'),
    path('stats/', project_stat_view, name='project-stat'),
    path('contact/', ContactInquiryCreateView.as_view(), name='contact-inquiry'),
]
