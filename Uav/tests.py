from django.test import TestCase
from .models import UAV

class UAVTestCase(TestCase):
    def setUp(self):
        self.uav_data = {
            'model_name': 'Test UAV',
            'max_flight_time': 10.5,
            'weight': 25.0,
            'communication_tech': 'wifi',
            'operational_altitude': 500,
            'max_speed': 100,
            'payload_capacity': 5.0,
            'endurance': 8.0,
            'control_system': 'autonomous',
            'applications': 'Test applications',
            'onboard_computers': 2,
        }

    def test_uav_creation(self):
        uav = UAV.objects.create(**self.uav_data)

        self.assertEqual(uav.model_name, self.uav_data['model_name'])
        self.assertEqual(uav.max_flight_time, self.uav_data['max_flight_time'])
        self.assertEqual(uav.weight, self.uav_data['weight'])
        self.assertEqual(uav.communication_tech, self.uav_data['communication_tech'])
        self.assertEqual(uav.operational_altitude, self.uav_data['operational_altitude'])
        self.assertEqual(uav.max_speed, self.uav_data['max_speed'])
        self.assertEqual(uav.payload_capacity, self.uav_data['payload_capacity'])
        self.assertEqual(uav.endurance, self.uav_data['endurance'])
        self.assertEqual(uav.control_system, self.uav_data['control_system'])
        self.assertEqual(uav.applications, self.uav_data['applications'])
        self.assertEqual(uav.onboard_computers, self.uav_data['onboard_computers'])
