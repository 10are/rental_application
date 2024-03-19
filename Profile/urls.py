from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .api.views import ProfileViewSet

router = DefaultRouter()
router.register(r'', ProfileViewSet, basename='profile')

urlpatterns = [
    path('', include(router.urls)),
]