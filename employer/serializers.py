from rest_framework import serializers
from .models import *
from django.contrib.auth.models import User
from user_profile.serializers import UserProfileSerializer

class ExtraUserDataSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = ExtraUserData
        fields = ('pk','codCPatria','serCPatria','whatsapp','facebook','instagram','twitter')

class DepartmentsSerializer(serializers.ModelSerializer):

    class Meta:
        model = Departments
        fields = ('pk','name', 'description')

class InstitutionalUserDataSerializer(serializers.ModelSerializer):
    department_id = serializers.IntegerField()
    department = DepartmentsSerializer(many=False,read_only=True)

    class Meta:
        model = InstitutionalUserData
        fields = ('pk','dateIn', 'condition', 'category', 'appointment', 'positionOPSU', 'department',"department_id")
        depth = 1

class StudyUserDataSerializer(serializers.ModelSerializer):

    class Meta:
        model = StudyUserData
        fields = ('pk', 'typeStudy', 'startDate', 'endDate', 'study')

class TeachingComponentUserDataSerializer(serializers.ModelSerializer):

    class Meta:
        model = TeachingComponentUserData
        fields = ('pk', 'typeComponent', 'universityOrigin', 'startDate', 'endDate', 'observation')


"""
    Este serialicer esta de ultimo porque todos los otros concluyen dentro de este y debe conocerlos.
    el many false es para indicar que la relacion va de regreso al user data, en el http://localhost:8000/api/UserData/ se debe ve el json con todos
    los serialicers 
"""
class UserDataSerializer(serializers.ModelSerializer):
    
    extra = ExtraUserDataSerializer(many=False)
    institutional = InstitutionalUserDataSerializer(many=False)
    study = StudyUserDataSerializer(many=True)
    teaching = TeachingComponentUserDataSerializer(many=True)
    # user_id = serializers.IntegerField(required=False,allow_null=True)
    # user = UserProfileSerializer(many=False,required=False,allow_null=True)
    # permissions = PermissionsEmployerSerializer(many=False,read_only=True) #El read Only es para que este serializer no sea obligatorio mandarlo en los post
    # medicalrest = MedicalRestEmployerSerializer(many=False,read_only=True)
    # servicescomission = ServicesCommissionEmployerSerializer(many=False,read_only=True)

    class Meta:
        model = UserData
        fields = ('pk','identification','fName','sName','fSurname','sSurname',
         'birthDate','address','phone','license','extra', #'email',
         'institutional','study','teaching','active',
        #  'user','user_id'
        )
        depth = 1 

    def create(self, validated_data):
        institutional = validated_data.pop('institutional')
        extra = validated_data.pop('extra')
        study = validated_data.pop('study')
        teaching = validated_data.pop('teaching')
        user = UserData.objects.create(**validated_data)
        #Asignacion del usuario a los modelos
        extra['userData'] = user
        institutional['userData'] = user
        for study_obj in study:
            study_obj['userData'] = user
            StudyUserData.objects.create(**study_obj)

        for teaching_obj in teaching:
            teaching_obj['userData'] = user
            TeachingComponentUserData.objects.create(**teaching_obj)
        ExtraUserData.objects.create(**extra)
        InstitutionalUserData.objects.create(**institutional)      
        return user

    #El self es la instancia
    def update(self, instance, validated_data):
        validated_data.pop('institutional') if "institutional" in validated_data else None
        validated_data.pop('extra') if "extra" in validated_data else None
        validated_data.pop('study') if "study" in validated_data else None
        validated_data.pop('teaching') if "teaching" in validated_data else None
        instance = super().update(instance,validated_data)
        return instance

class MedicalRestEmployerSerializer(serializers.ModelSerializer):
    # Con este par de lineas, buscamos el pk del serialicer y nos traemos los datos con la relacion 
    userData_id = serializers.IntegerField()
    userData = UserDataSerializer(many=False,read_only=True)

    class Meta:
        model = MedicalRestEmployer
        fields = ('pk','userData', 'approvedBoss', 'reportDate', 'startDate', 'endDate', 'description', 'observation', 'userData_id')

    # userData_id = serializers.IntegerField(read_only=True)
    # userData = UserDataSerializer(many=False,read_only=True)

    # class Meta:
    #     model = MedicalRestEmployer
    #     fields = ('pk','userData', 'approvedBoss', 'reportDate', 'startDate', 'endDate', 'description', 'observation', 'userData_id')
    #     read_only_fields = ('userData',)

class ServicesCommissionEmployerSerializer(serializers.ModelSerializer):
    userData_id = serializers.IntegerField()
    userData = UserDataSerializer(many=False,read_only=True)

    class Meta:
        model = ServicesCommissionEmployer
        fields = ('pk','userData', 'reportDate', 'startDate', 'endDate', 'description', 'approvedBoss', 'approvedFinished', 'observation', 'userData_id')

class PermissionsEmployerSerializer(serializers.ModelSerializer):
    # Con este par de lineas, buscamos el pk del serialicer y nos traemos los datos con la relacion 
    userData_id = serializers.IntegerField()
    userData = UserDataSerializer(many=False,read_only=True)

    class Meta:
        model = PermissionsEmployer
        fields = ('pk','userData', 'inDate', 'startDate', 'endDate', 'description', 'approvedBoss', 'commentBoss', 'approvedFinished','commentBossTH', 'approvedBossTH', 'commentFinished', 'userData_id')
