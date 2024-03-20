from rest_framework import serializers
from ..models import Rental
from Uav.models import UAV

class RentalSerializer(serializers.ModelSerializer):
    uav_model_name = serializers.SerializerMethodField()

    class Meta:
        model = Rental
        fields = '__all__'  

    def get_uav_model_name(self, obj):
        return obj.uav.model_name
