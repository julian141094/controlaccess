from rest_framework import serializers
from .models import *
from employer.serializers import UserDataSerializer

from datetime import timedelta

class InAndOutSerializer(serializers.ModelSerializer):
    # Con este par de lineas, buscamos el pk del serialicer y nos traemos los datos con la relacion 
    userData_id = serializers.IntegerField()
    userData = UserDataSerializer(many=False,read_only=True)
    worker = serializers.SerializerMethodField('get_hours')

    class Meta:
        model = Inandout
        fields = ('pk','userData', 'date', 'timeIn', 'timeOutEat', 
            'timeInEat', 'timeOut', 'userData_id', 'observation',
            'worker')

    def get_hours(self,obj):
        signin_datetime = timedelta(hours = obj.timeIn.hour , minutes = obj.timeIn.minute)
        total = '/'
        if(obj.timeOut != None):
            signout_datetime = timedelta(hours = obj.timeOut.hour , minutes = obj.timeOut.minute) 
            total = signout_datetime - signin_datetime
        return str(total)