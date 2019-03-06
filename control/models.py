from django.db import models
from employer.models import UserData
from django.utils import timezone

class Inandout(models.Model):

    userData = models.ForeignKey(UserData,on_delete=models.CASCADE,related_name='access')
    date = models.DateField(verbose_name='Fecha de la Entrada')
    timeIn = models.TimeField(verbose_name='Hora de Entrada')
    timeOutEat = models.TimeField(verbose_name='Hora de Salida a Comer',blank=True, null=True)
    timeInEat = models.TimeField(verbose_name='Hora de Entrada',blank=True, null=True)
    timeOut = models.TimeField(verbose_name='Hora de Salida',blank=True, null=True)
