from rest_framework import viewsets, permissions
from ..models import UAV
from .serializers import UAVSerializer

class UAVViewSet(viewsets.ModelViewSet):
    queryset = UAV.objects.all()
    serializer_class = UAVSerializer

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [permissions.AllowAny()]
        else:
            return [permissions.IsAdminUser()]
