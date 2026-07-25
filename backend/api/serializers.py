from rest_framework import serializers
from .models import Review, ProjectStat, ContactInquiry

class ReviewSerializer(serializers.ModelSerializer):
    avatar = serializers.SerializerMethodField()

    class Meta:
        model = Review
        fields = ['id', 'name', 'role', 'rating', 'text', 'avatar', 'is_approved', 'created_at']

    def get_avatar(self, obj):
        name_parts = obj.name.strip().split()
        if len(name_parts) >= 2:
            return f"{name_parts[0][0]}{name_parts[1][0]}".upper()
        elif len(name_parts) == 1 and name_parts[0]:
            return name_parts[0][:2].upper()
        return "CL"

class ProjectStatSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectStat
        fields = ['total_completed', 'updated_at']

class ContactInquirySerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactInquiry
        fields = ['id', 'name', 'service', 'message', 'created_at']
