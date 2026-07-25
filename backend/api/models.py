from django.db import models

class Review(models.Model):
    name = models.CharField(max_length=100)
    role = models.CharField(max_length=100, default='Client', blank=True)
    rating = models.IntegerField(default=5)
    text = models.TextField()
    is_approved = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} ({self.rating}★) - {self.role}"

class ProjectStat(models.Model):
    total_completed = models.IntegerField(default=0)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Completed Projects: {self.total_completed}+"

class ContactInquiry(models.Model):
    name = models.CharField(max_length=100)
    service = models.CharField(max_length=100)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Inquiry from {self.name} for {self.service}"
