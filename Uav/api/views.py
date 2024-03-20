from rest_framework import viewsets, permissions
from ..models import UAV
from .serializers import UAVSerializer
from .filters import UAVFilter 
from django_filters.rest_framework import DjangoFilterBackend

class UAVViewSet(viewsets.ModelViewSet):
    queryset = UAV.objects.all()
    serializer_class = UAVSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_class = UAVFilter
    permission_classes = [permissions.AllowAny]
