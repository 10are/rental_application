import django_filters
from ..models import UAV

class UAVFilter(django_filters.FilterSet):
    class Meta:
        model = UAV
        fields = {
            'model_name': ['icontains'],
            'max_flight_time': ['gt', 'lt'],
            'weight': ['gt', 'lt'],
            'communication_tech': ['exact'],
            'operational_altitude': ['gt', 'lt'],
            'max_speed': ['gt', 'lt'],
            'payload_capacity': ['gt', 'lt'],
            'endurance': ['gt', 'lt'],
            'control_system': ['exact'],
        }
