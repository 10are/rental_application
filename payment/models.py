from django.db import models

class Payment(models.Model):
    CURRENCY_CHOICES = [
        ('TRY', 'TL'),
        ('USD', 'Dolar'),
        ('EUR', 'Euro'),
    ]
    
    amount = models.DecimalField(max_digits=10, decimal_places=2, verbose_name="Tutar")
    currency = models.CharField(max_length=3, choices=CURRENCY_CHOICES, verbose_name="Para Birimi")
    date = models.DateField(verbose_name="SonGeçerlilik Tarihi")

    def __str__(self):
        return f"{self.amount} {self.get_currency_display()} - {self.date}"
