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

    def update(self, request, pk=None):
        """
        Method of the request by put to update the Price Formula data

        @param self Object which instantiates the method
        @param request Object with the request
        @param pk Get the pk of the url
        @return Returns the data and stores in database
        """
        userData = self.get_object()
        user = request.data.pop("user")
        serializer = self.get_serializer(userData, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.update_user(user)
        # serializer.update(pk,request.data)
        serializer.save()
        return Response(serializer.data)

class DepartmentsModelView(viewsets.ModelViewSet):
    
    queryset                    = Departments.objects.all()
    permission_classes = (permissions.AllowAny,)

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
