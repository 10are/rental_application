from rest_framework import viewsets
from ..models import Rental
from .serializers import RentalSerializer
from rest_framework import viewsets
from rest_framework import viewsets, permissions
from .serializers import RentalSerializer
from ..models import Rental

class RentalViewSet(viewsets.ModelViewSet):
    queryset = Rental.objects.all()
    serializer_class = RentalSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def get_queryset(self):
        user = self.request.user
        if user.is_superuser:
            return Rental.objects.all()  
        return Rental.objects.filter(user=user)  