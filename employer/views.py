from rest_framework import viewsets
from .serializers import *
from rest_framework import filters

class UserDataModelView(viewsets.ModelViewSet):
    
    queryset                    = UserData.objects.all()
    serializer_class            = UserDataSerializer
    # Aqui se pasa el filtro
    # filter_fields = {
    #     'fName':['icontains'],
    #     'sName':['icontains'],
    # }
    # filter_backends = (filters.SearchFilter,)
    search_fields = {
        'fName':['icontains'],
        'sName':['icontains'],
        'fSurname':['icontains'],
        'sSurname':['icontains'],
    }

class DepartmentsModelView(viewsets.ModelViewSet):
    
    queryset                    = Departments.objects.all()
    serializer_class            = DepartmentsSerializer

class PermissionsEmployerModelView(viewsets.ModelViewSet):
    
    queryset                    = PermissionsEmployer.objects.all()
    serializer_class            = PermissionsEmployerSerializer

class MedicalRestEmployerModelView(viewsets.ModelViewSet):
    
    queryset                    = MedicalRestEmployer.objects.all()
    serializer_class            = MedicalRestEmployerSerializer

class ServicesCommissionEmployerModelView(viewsets.ModelViewSet):
    
    queryset                    = ServicesCommissionEmployer.objects.all()
    serializer_class            = ServicesCommissionEmployerSerializer