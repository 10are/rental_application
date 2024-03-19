from django.db import models
from django.contrib.auth.models import User
from django_countries.fields import CountryField

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    organization = models.CharField(max_length=100, verbose_name='Organization Name')
    phone = models.CharField(max_length=20, verbose_name='Phone Number')
    country = CountryField(blank_label='(select country)')
    document = models.FileField(upload_to='documents/%Y/%m/%d/', verbose_name='Document')

    def __str__(self):
        return self.user.username
