from django.contrib import admin
from .models import UAV

@admin.register(UAV)
class UAVAdmin(admin.ModelAdmin):
    list_display = ['model_name', 'max_flight_time', 'weight', 'communication_tech', 'operational_altitude', 'max_speed', 'payload_capacity', 'endurance', 'control_system', 'applications', 'onboard_computers']
