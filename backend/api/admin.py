from django.contrib import admin
from .models import Review, ProjectStat, ContactInquiry, PortfolioVisitor

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

@admin.register(PortfolioVisitor)
class PortfolioVisitorAdmin(admin.ModelAdmin):
    list_display = ('client_id', 'visit_date', 'today_views_count', 'last_visit_time', 'ip_address')
    list_filter = ('visit_date',)
    search_fields = ('client_id', 'ip_address')
    ordering = ('-last_visit_time',)
