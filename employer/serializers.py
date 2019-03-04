from rest_framework import serializers
from .models import *

class DepartmentsSerializer(serializers.ModelSerializer):

    class Meta:
        model = Departments
        fields = ('pk','name', 'description')

class InstitutionalUserDataSerializer(serializers.ModelSerializer):
    department_id = serializers.IntegerField()
    department = DepartmentsSerializer(many=False,read_only=True)

    class Meta:
        model = InstitutionalUserData
        fields = ('dateIn', 'condition', 'category', 'appointment', 'positionOPSU', 'department',"department_id")
        depth = 1

"""
    Este serialicer esta de ultimo porque todos los otros concluyen dentro de este y debe conocerlos.
    el many false es para indicar que la relacion va de regreso al user data, en el http://localhost:8000/api/UserData/ se debe ve el json con todos
    los serialicers 
"""
class UserDataSerializer(serializers.ModelSerializer):
    
    institutional = InstitutionalUserDataSerializer(many=False)
    
    class Meta:
        model = UserData
        fields = ('pk','identification','fName','sName','fSurname',
        'sSurname','birthDate','email','address','phone','license',
         'institutional','active',#, 'permissions', 'medicalrest', 'servicescomission'
        )
        depth = 1 

    def create(self, validated_data):
        print(validated_data, 'Aqui VAAAAAAAAAAAAAAAAA')
        institutional = validated_data.pop('institutional')
        user = UserData.objects.create(**validated_data)
        #Asignacion del usuario a los modelos
        institutional['userData'] = user
        InstitutionalUserData.objects.create(**institutional)
        return user

    #El self es la instancia
    def update(self, instance, validated_data):
        institutional = validated_data.pop('institutional')
        instance = super().update(instance,validated_data)
        InstitutionalUserDataSerializer().update(instance.institutional,institutional)
        return instance

class IncidentsEmployerSerializer(serializers.ModelSerializer):
    userData_id = serializers.IntegerField()
    userData = UserDataSerializer(many=False,read_only=True)

    class Meta:
        model = IncidentsEmployer
        fields = ('pk','userData', 'reportDate', 'startDate', 'endDate', 'description', 'approvedBoss', 'observation', 'userData_id')
