from django.db import models
from employer.models import UserData

class Inandout(models.Model):

    userData = models.ForeignKey(UserData,on_delete=models.CASCADE,related_name='access')
    date = models.DateField(verbose_name='Fecha de la Entrada')
    timeIn = models.TimeField(verbose_name='Hora de Entrada')
    timeOutEat = models.TimeField(verbose_name='Hora de Salida a Comer')
    timeInEat = models.TimeField(verbose_name='Hora de Entrada')
    timeOut = models.TimeField(verbose_name='Hora de Salida')
