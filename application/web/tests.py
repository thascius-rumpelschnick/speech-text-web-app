"""WebTest"""

from django.test import TestCase


class WebTest(TestCase):

    def test_foo(self):
        x = True
        self.assertTrue(x)
