from rest_framework import serializers
from .models import *
from employer.serializers import UserDataSerializer

class InAndOutSerializer(serializers.ModelSerializer):
    # Con este par de lineas, buscamos el pk del serialicer y nos traemos los datos con la relacion 
    userData_id = serializers.IntegerField()
    userData = UserDataSerializer(many=False,read_only=True)

    class Meta:
        model = Inandout
        fields = ('pk','userData', 'date', 'timeIn', 'timeOutEat', 'timeInEat', 'timeOut', 'userData_id', 'observation')
