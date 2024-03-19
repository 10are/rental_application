from rest_framework import viewsets, permissions
from ..models import UAV
from .serializers import UAVSerializer

class UAVViewSet(viewsets.ModelViewSet):
    queryset = UAV.objects.all()
    serializer_class = UAVSerializer

    def get_permissions(self):
        if self.action == 'create':
            return [permissions.IsAdminUser()]
        return [permissions.AllowAny()]
