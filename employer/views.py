# Esto es para importar las viuset, y los permisos que se le otorgaran a las vistas 
from rest_framework import viewsets, permissions
from .serializers import *
from rest_framework import filters
from user_profile.serializers import UserProfileSerializer
from rest_framework.response import Response
from rest_framework import status

class UserDataModelView(viewsets.ModelViewSet):
    
    queryset                    = UserData.objects.all()
    permission_classes = (permissions.AllowAny,)
    serializer_class            = UserDataSerializer
    # Aqui se pasa el filtro
    # filter_fields = {
    #     'fName':['icontains'],
    #     'sName':['icontains'],
    # }
    # filter_backends = (filters.SearchFilter,)
    search_fields = {
        'sName':['icontains'],
        'sSurname':['icontains'],
    }

class DepartmentsModelView(viewsets.ModelViewSet):
    
    queryset                    = Departments.objects.all()
    permission_classes = (permissions.IsAuthenticated,)

    serializer_class            = DepartmentsSerializer

class PermissionsEmployerModelView(viewsets.ModelViewSet):
    
    queryset                    = PermissionsEmployer.objects.all()
    serializer_class            = PermissionsEmployerSerializer

class MedicalRestEmployerModelView(viewsets.ModelViewSet):
    
    queryset                    = MedicalRestEmployer.objects.all()
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class            = MedicalRestEmployerSerializer

class ServicesCommissionEmployerModelView(viewsets.ModelViewSet):
    
    queryset                    = ServicesCommissionEmployer.objects.all()
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class            = ServicesCommissionEmployerSerializer
