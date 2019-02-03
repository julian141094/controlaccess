from rest_framework import serializers
from .models import *

class UserDataSerializer(serializers.ModelSerializer):

    class Meta:
        model = UserData
        fields = ('identification','fName','sName','fSurname',
        'sSurname','birthDate','email','address','phone','license','extra')


class ExtraUserDataSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = ExtraUserData
        fields = ('codCPatria','serCPatria','whatsapp','facebook','instagram','twitter')

class InstitutionalUserDataSerializer(serializers.ModelSerializer):

    class Meta:
        model = InstitutionalUserData
        fields = ('dateIn', 'condition', 'category')

class StudyUserDataSerializer(serializers.ModelSerializer):

    class Meta:
        model = StudyUserData
        fields = ('typeStudy', 'startDate', 'endDate', 'study')

class TeachingComponentUserDataSerializer(serializers.ModelSerializer):

    class Meta:
        model = TeachingComponentUserData
        fields = ('typeComponent', 'universityOrigin', 'startDate', 'endDate', 'observation')