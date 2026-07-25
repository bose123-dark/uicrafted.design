from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Review, ProjectStat, ContactInquiry
from .serializers import ReviewSerializer, ProjectStatSerializer, ContactInquirySerializer

class ReviewListCreateView(generics.ListCreateAPIView):
    serializer_class = ReviewSerializer

    def get_queryset(self):
        return Review.objects.filter(is_approved=True).order_by('-created_at')

@api_view(['GET', 'POST'])
def project_stat_view(request):
    stat, created = ProjectStat.objects.get_or_create(id=1, defaults={'total_completed': 0})
    
    if request.method == 'GET':
        serializer = ProjectStatSerializer(stat)
        return Response(serializer.data)
    
    elif request.method == 'POST':
        count = request.data.get('total_completed')
        if count is not None:
            try:
                stat.total_completed = int(count)
                stat.save()
                return Response(ProjectStatSerializer(stat).data)
            except ValueError:
                return Response({'error': 'Invalid number'}, status=status.HTTP_400_BAD_REQUEST)
        return Response({'error': 'total_completed required'}, status=status.HTTP_400_BAD_REQUEST)

class ContactInquiryCreateView(generics.CreateAPIView):
    queryset = ContactInquiry.objects.all()
    serializer_class = ContactInquirySerializer
