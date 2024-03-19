from django.contrib import admin
from .models import Rental

class RentalAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'uav_model_name', 'start_date', 'end_date')

    def uav_model_name(self, obj):
        return obj.uav.model_name
    uav_model_name.short_description = 'UAV Model Adı'  

admin.site.register(Rental, RentalAdmin)
