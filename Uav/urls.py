from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .api.views import UAVViewSet

router = DefaultRouter()
router.register(r'', UAVViewSet, basename='uav')

urlpatterns = [
    path('', include(router.urls)),
]
