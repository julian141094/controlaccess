from django.db import models
from employer.models import UserData
from datetime import timedelta
class Inandout(models.Model):
  userData = models.ForeignKey(UserData,on_delete=models.CASCADE,related_name='access')
  date = models.DateField(verbose_name='Fecha de la Entrada')
  timeIn = models.TimeField(verbose_name='Hora de Entrada')
  timeOutEat = models.TimeField(verbose_name='Hora de Salida a Comer',blank=True, null=True)
  timeInEat = models.TimeField(verbose_name='Hora de Entrada',blank=True, null=True)
  timeOut = models.TimeField(verbose_name='Hora de Salida',blank=True, null=True)
  observation = models.CharField(verbose_name='Observación', max_length=200, null=True,blank=True)

  def get_hours(self):
    signin_datetime = timedelta(hours = self.timeIn.hour , minutes = self.timeIn.minute)
    total = '--'
    if(self.timeOut != None):
      signout_datetime = timedelta(hours = self.timeOut.hour , minutes = self.timeOut.minute) 
      total = signout_datetime - signin_datetime
    return str(total)