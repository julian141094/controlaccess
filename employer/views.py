from rest_framework import viewsets
from .serializers import *

class UserDataModelView(viewsets.ModelViewSet):
    
    queryset                    = UserData.objects.all()
    serializer_class            = UserDataSerializer


class DepartmentsModelView(viewsets.ModelViewSet):
    
    queryset                    = Departments.objects.all()
    serializer_class            = DepartmentsSerializer

class InstitutionalModelView(viewsets.ModelViewSet):
    
    queryset                    = InstitutionalUserData.objects.all()
    serializer_class            = InstitutionalUserDataSerializer