from django.db import models
from django.contrib.auth.models import User
from Uav.models import UAV
from django.core.exceptions import ValidationError
from django.utils import timezone

class Rental(models.Model):
    uav = models.ForeignKey(UAV, on_delete=models.CASCADE, verbose_name="UAV", related_name="rentals")
    user = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name="Kullanıcı", related_name="rentals")
    start_date = models.DateTimeField(verbose_name="Başlangıç Tarihi")
    end_date = models.DateTimeField(verbose_name="Bitiş Tarihi")

    def save(self, *args, **kwargs):
        if self.pk is None:  
            active_rentals = Rental.objects.filter(uav=self.uav, end_date__gt=timezone.now()).exists()
            if active_rentals:
                raise ValidationError(f"{self.uav.model_name} şu anda başka bir kiralama işlemi nedeniyle mevcut değil.")
            if self.start_date < timezone.now():
                raise ValidationError("Başlangıç tarihi günümüzden geri olamaz.")
            if self.end_date <= self.start_date:
                raise ValidationError("Bitiş tarihi, başlangıç tarihinden önce olamaz.")
        super().save(*args, **kwargs)
