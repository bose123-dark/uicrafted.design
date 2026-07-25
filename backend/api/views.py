import datetime
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Review, ProjectStat, ContactInquiry, PortfolioVisitor
from .serializers import ReviewSerializer, ProjectStatSerializer, ContactInquirySerializer, PortfolioVisitorSerializer

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

@api_view(['POST'])
def track_visit_view(request):
    client_id = request.data.get('client_id')
    source = request.data.get('source', 'Direct Visit / Instagram Bio')
    today = datetime.date.today()
    
    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded_for:
        ip = x_forwarded_for.split(',')[0].strip()
    else:
        ip = request.META.get('REMOTE_ADDR', '127.0.0.1')

    if not client_id:
        client_id = f"Visitor ({source} - IP: {ip})"
    else:
        client_id = str(client_id).strip()

    visitor, created = PortfolioVisitor.objects.get_or_create(
        client_id=client_id,
        visit_date=today,
        defaults={'ip_address': ip, 'today_views_count': 1}
    )

    if not created:
        visitor.today_views_count += 1
        visitor.save()

    return Response({
        'status': 'success',
        'client_id': visitor.client_id,
        'visit_date': visitor.visit_date,
        'today_views_count': visitor.today_views_count,
        'is_new_today': created
    })
