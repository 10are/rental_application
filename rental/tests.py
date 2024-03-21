from django.test import TestCase
from django.contrib.auth.models import User
from django.utils import timezone
from datetime import timedelta
from .models import Rental
from Uav.models import UAV
from django.core.exceptions import ValidationError

class RentalModelTestCase(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='testpassword')
        self.uav = UAV.objects.create(model_name='Test UAV', max_flight_time=10.0, weight=20.0,
        communication_tech='wifi', operational_altitude=500,
         max_speed=100, payload_capacity=5.0, endurance=8.0,
         control_system='autonomous', applications='Test applications',
         onboard_computers=2)

    def test_rental_creation(self):
        start_date = timezone.now().date() + timedelta(days=1)
        end_date = timezone.now().date() + timedelta(days=5)
        rental = Rental.objects.create(uav=self.uav, user=self.user, start_date=start_date, end_date=end_date)

        self.assertEqual(rental.uav, self.uav)
        self.assertEqual(rental.user, self.user)
        self.assertEqual(rental.start_date, start_date)
        self.assertEqual(rental.end_date, end_date)

    def test_active_rental_validation(self):
        start_date = timezone.now().date() + timedelta(days=1)
        end_date = timezone.now().date() + timedelta(days=5)
        Rental.objects.create(uav=self.uav, user=self.user, start_date=start_date, end_date=end_date)

        with self.assertRaises(ValidationError) as cm:
            Rental.objects.create(uav=self.uav, user=self.user, start_date=start_date, end_date=end_date)
        self.assertEqual(cm.exception.messages[0], f"{self.uav.model_name} şu anda başka bir kiralama işlemi nedeniyle mevcut değil.")

    def test_past_start_date_validation(self):
        start_date = timezone.now().date() - timedelta(days=1)
        end_date = timezone.now().date() + timedelta(days=5)

        with self.assertRaises(ValidationError) as cm:
            Rental.objects.create(uav=self.uav, user=self.user, start_date=start_date, end_date=end_date)
        self.assertEqual(cm.exception.messages[0], "Başlangıç tarihi günümüzden geri olamaz.")


    def test_end_date_before_start_date_validation(self):
        start_date = timezone.now().date() + timedelta(days=1)
        end_date = start_date - timedelta(days=1)

        with self.assertRaises(ValidationError) as cm:
            Rental.objects.create(uav=self.uav, user=self.user, start_date=start_date, end_date=end_date)
        self.assertEqual(cm.exception.messages[0], "Bitiş tarihi, başlangıç tarihinden önce olamaz.")

