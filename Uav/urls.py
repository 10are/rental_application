from django.urls import path
from .views import UAVListCreateAPIView, UAVDetailAPIView

urlpatterns = [
    path('uavs/', UAVListCreateAPIView.as_view(), name='uav-list-create'),
    path('uavs/<int:pk>/', UAVDetailAPIView.as_view(), name='uav-detail'),
]
