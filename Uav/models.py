from django.db import models

class CommunicationTech(models.TextChoices):
    WIFI = 'wifi', 'Wi-Fi'
    RADIO = 'radio', 'Radio'
    SATELLITE = 'satellite', 'Satellite'
    CELLULAR = 'cellular', 'Cellular'

class ControlSystem(models.TextChoices):
    MANUAL = 'manual', 'Manuel'
    AUTONOMOUS = 'autonomous', 'Otonom'
    REMOTE_CONTROL = 'remote_control', 'Uzaktan Kontrol'

class UAV(models.Model):
    model_name = models.CharField(max_length=100, verbose_name="Model Adı")
    max_flight_time = models.FloatField(verbose_name="Maksimum Uçuş Süresi (saat)")
    weight = models.FloatField(verbose_name="Ağırlık (kg)")
    communication_tech = models.CharField(max_length=100, choices=CommunicationTech.choices, verbose_name="İletişim Teknolojileri")
    operational_altitude = models.IntegerField(verbose_name="Operasyonel İrtifa (feet)")
    max_speed = models.IntegerField(verbose_name="Maksimum Hız (km/saat)")
    payload_capacity = models.FloatField(verbose_name="Yük Kapasitesi (kg)")
    endurance = models.FloatField(verbose_name="Dayanıklılık (saat)")
    control_system = models.CharField(max_length=100, choices=ControlSystem.choices, verbose_name="Kontrol Sistemi")
    applications = models.TextField(verbose_name="Uygulama Alanları")
    onboard_computers = models.IntegerField(verbose_name="Yüklü Bilgisayar Sayısı", null=True, blank=True)

    def __str__(self):
        return self.model_name

