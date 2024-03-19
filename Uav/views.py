from rest_framework import generics, permissions
from .models import UAV
from .serializers import UAVSerializer

class UAVListCreateAPIView(generics.ListCreateAPIView):
    queryset = UAV.objects.all()
    serializer_class = UAVSerializer
    def get_permissions(self):
        if self.request.method in ['POST']:
            return [permissions.IsAdminUser()]
        return [permissions.AllowAny()]

class UAVDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = UAV.objects.all()
    serializer_class = UAVSerializer
    permission_classes = [permissions.IsAdminUser]
