from django.urls import path
from .views import ReviewListCreateView, project_stat_view, ContactInquiryCreateView, track_visit_view

urlpatterns = [
    path('reviews/', ReviewListCreateView.as_view(), name='review-list-create'),
    path('stats/', project_stat_view, name='project-stat'),
    path('contact/', ContactInquiryCreateView.as_view(), name='contact-inquiry'),
    path('track-visit/', track_visit_view, name='track-visit'),
]
