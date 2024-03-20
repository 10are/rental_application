from rest_framework import viewsets
from ..models import Rental
from .serializers import RentalSerializer
from rest_framework import viewsets
from rest_framework import viewsets, permissions
from .serializers import RentalSerializer
from ..models import Rental
from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.exceptions import PermissionDenied


class RentalViewSet(viewsets.ModelViewSet):
    queryset = Rental.objects.all()
    serializer_class = RentalSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        user = self.request.user
        if not user.is_superuser:
            if 'user' in serializer.validated_data and serializer.validated_data['user'] != user:
                raise PermissionDenied('Kullanıcılar yalnızca kendi adlarına kiralama yapabilirler.')
            serializer.save(user=user)
        else:
            requested_user = serializer.validated_data.get('user', user)
            serializer.save(user=requested_user)


    def get_queryset(self):
        user = self.request.user
        if user.is_superuser:
            return Rental.objects.all()  
        return Rental.objects.filter(user=user)

