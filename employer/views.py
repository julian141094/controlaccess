# Esto es para importar las viuset, y los permisos que se le otorgaran a las vistas 
from rest_framework import viewsets, permissions
from .serializers import *
from rest_framework import filters
from user_profile.serializers import UserProfileSerializer
from rest_framework.response import Response
from rest_framework import status
import json

class UserDataModelView(viewsets.ModelViewSet):
    
    queryset                    = UserData.objects.all()
    permission_classes = (permissions.AllowAny,)
    serializer_class            = UserDataSerializer
    search_fields = {
        'fName':['icontains'],
        'sName':['icontains'],
        'fSurname':['icontains'],
        'sSurname':['icontains'],
    }

    def update(self, request, pk=None):
        """
        Method of the request by put to update the Product data
        @param self Object which instantiates the method
        @param request Object with the request
        @param pk Get the pk of the url
        @return Returns the data and stores in database
        """
        user = self.get_object()
        institutional = request.data["institutional"]
        extra = request.data["extra"]
        study = request.data["study"]
        teaching = request.data["teaching"]
        deleteStudy = request.data.pop("deleteStudy") if "deleteStudy" in request.data else None
        deleteTeaching = request.data.pop("deleteTeaching") if "deleteTeaching" in request.data else None 

        #Section extra
        if(extra != None):
            user.extra.codCPatria = extra['codCPatria']
            user.extra.serCPatria = extra['serCPatria']
            user.extra.whatsapp = extra['whatsapp']
            user.extra.instagram = extra['instagram']
            user.extra.twitter = extra['twitter']
            user.extra.facebook = extra['facebook']
            user.extra.save()   
        #Section institutional
        if(institutional != None):
            user.institutional.department_id = institutional['department_id']
            user.institutional.dateIn = institutional['dateIn']
            user.institutional.condition = institutional['condition']
            user.institutional.category = institutional['category']
            user.institutional.appointment = institutional['appointment']
            user.institutional.positionOPSU = institutional['positionOPSU']
            user.institutional.save()
        #Section teaching
        if(deleteTeaching != None):
            TeachingComponentUserData.objects.filter(pk__in = deleteTeaching).delete()

        if(teaching != None):
            for attr in teaching:
                pkVals = attr.pop('pk') if "pk" in attr and attr["pk"] != '' else None
                user.teaching.update_or_create(pk=pkVals,defaults={
                    "typeComponent": attr["typeComponent"],
                    "universityOrigin": attr["universityOrigin"],
                    "startDate": attr["startDate"],
                    "endDate": attr["endDate"],
                    "observation": attr["observation"]
                })
        #Section study
        if(deleteStudy != None):
            StudyUserData.objects.filter(pk__in = deleteStudy).delete()
            
        if(study != None):    
            for attr in study:
                pkVals = attr.pop('pk') if "pk" in attr and attr["pk"] != '' else None
                user.study.update_or_create(pk=pkVals,defaults={
                    "typeStudy": attr["typeStudy"],
                    "startDate": attr["startDate"],
                    "endDate": attr["endDate"],
                    "study": attr["study"],
                })

        serializer = self.get_serializer(user, data=request.data)
        serializer.is_valid(raise_exception=True)
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
