from django.contrib import admin
from .models import Review, ProjectStat, ContactInquiry

@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ('name', 'role', 'rating', 'is_approved', 'created_at')
    list_filter = ('is_approved', 'rating', 'created_at')
    search_fields = ('name', 'role', 'text')
    list_editable = ('is_approved',)

@admin.register(ProjectStat)
class ProjectStatAdmin(admin.ModelAdmin):
    list_display = ('total_completed', 'updated_at')

@admin.register(ContactInquiry)
class ContactInquiryAdmin(admin.ModelAdmin):
    list_display = ('name', 'service', 'created_at')
    search_fields = ('name', 'service', 'message')
    readonly_fields = ('created_at',)
