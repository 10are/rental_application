from rest_framework import viewsets, status
from rest_framework.response import Response
from ..models import Rental
from .serializers import RentalSerializer
from Uav.models import UAV

class RentalViewSet(viewsets.ModelViewSet):
    queryset = Rental.objects.all()
    serializer_class = RentalSerializer
    
    def create(self, request, *args, **kwargs):
        uav_id = request.data.get('uav')
        if uav_id and not UAV.objects.filter(id=uav_id, is_available=True).exists():
            return Response({"detail": "Bu UAV şu anda mevcut değil."}, status=status.HTTP_400_BAD_REQUEST)
        
        return super().create(request, *args, **kwargs)
    
    def update(self, request, *args, **kwargs):
        uav_id = request.data.get('uav')
        if uav_id and not UAV.objects.filter(id=uav_id, is_available=True).exists():
            return Response({"detail": "Bu UAV şu anda mevcut değil."}, status=status.HTTP_400_BAD_REQUEST)
        
        return super().update(request, *args, **kwargs)
