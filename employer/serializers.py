from rest_framework import serializers
from .models import *

class ExtraUserDataSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = ExtraUserData
        fields = ('codCPatria','serCPatria','whatsapp','facebook','instagram','twitter')

class InstitutionalUserDataSerializer(serializers.ModelSerializer):

    class Meta:
        model = InstitutionalUserData
        fields = ('dateIn', 'condition', 'category', 'appointment', 'positionOPSU')

class StudyUserDataSerializer(serializers.ModelSerializer):

    class Meta:
        model = StudyUserData
        fields = ('typeStudy', 'startDate', 'endDate', 'study')

class TeachingComponentUserDataSerializer(serializers.ModelSerializer):

    class Meta:
        model = TeachingComponentUserData
        fields = ('typeComponent', 'universityOrigin', 'startDate', 'endDate', 'observation')


"""
    Este serialicer esta de ultimo porque todos los otros concluyen dentro de este y debe conocerlos.
    el many false es para indicar que la relacion va de regreso al user data, en el http://localhost:8000/api/UserData/ se debe ve el json con todos
    los serialicers 
"""
class UserDataSerializer(serializers.ModelSerializer):
    
    extra = ExtraUserDataSerializer(many=False)
    institutional = InstitutionalUserDataSerializer(many=False)
    study = StudyUserDataSerializer(many=False)
    teaching = TeachingComponentUserDataSerializer(many=False)

    class Meta:
        model = UserData
        fields = ('identification','fName','sName','fSurname',
        'sSurname','birthDate','email','address','phone','license','extra',
        'institutional','study','teaching'
        )