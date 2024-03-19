from django.db import models
from django.contrib.auth.models import User
from Uav.models import UAV
from django.core.exceptions import ValidationError

class Rental(models.Model):
    uav = models.ForeignKey(UAV, on_delete=models.CASCADE, verbose_name="UAV", related_name="rentals")
    user = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name="Kullanıcı", related_name="rentals")
    start_date = models.DateTimeField(verbose_name="Başlangıç Tarihi")
    end_date = models.DateTimeField(verbose_name="Bitiş Tarihi")

    def save(self, *args, **kwargs):
        if self.pk is None: 
            if not self.uav.is_available:
                raise ValidationError(f"{self.uav.model_name} şu anda mevcut değil.")
            else:
                self.uav.is_available = False  
                self.uav.save()
        super().save(*args, **kwargs)