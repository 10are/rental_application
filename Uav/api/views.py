from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets, permissions
from ..models import UAV
from .serializers import UAVSerializer
from .filters import UAVFilter 

class UAVViewSet(viewsets.ModelViewSet):
    queryset = UAV.objects.all()
    serializer_class = UAVSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_class = UAVFilter 

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            permission_classes = [permissions.AllowAny]
        else:
            permission_classes = [permissions.IsAdminUser]
        return [permission() for permission in permission_classes]
