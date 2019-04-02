from rest_framework import viewsets,views,filters,status,permissions
from .serializers import *
from rest_framework.response import Response
from django.utils import timezone
# importamos UserData del modelo de Employer (App)
from employer.models import UserData
from django.core import serializers
from django.contrib.auth.hashers import check_password
from django.core.exceptions import ValidationError

#Esta es la vista para el crud Normal
class InAndOutModelView(viewsets.ModelViewSet):
    
    queryset                    = Inandout.objects.all()
    serializer_class            = InAndOutSerializer
    permission_classes = (permissions.AllowAny,)
    # permission_classes = (permissions.IsAuthenticated,)

#Esta es la view para El carnet
class InAndOutApiView(views.APIView):

  serializer_class = InAndOutSerializer

  def post(self, request, format=None):
    data = request.data
    last_visit = Inandout.objects.filter(
      userData__identification__icontains = data['identification'],
      date=timezone.now()
    ).first()
    if(last_visit == None):
      user = UserData.objects.get(identification__icontains=data['identification'])
      if not(user):
        return Response({
          'detail':'Esta cédula no ha sido registrado por favor contacte con el jefe de RRHH'
        },status=400)
      
      if not(user.active):
        return Response({'detail':'Lo siento pero no puedes ingresar contacta con el jefe de RRHH'},status=400)
      
      if(data['mode'] != 'cam'):
        try:
          password = data['password']
          check_password(password = password, encoded = user.key.key)
        except ValidationError as e:
          return Response({'detail':'Error de contraseña'},status=400)
      
      perm = user.permissions.filter(endDate__gte=timezone.now())
      medical = user.medicalrest.filter(endDate__gte=timezone.now())

      if(perm.count() > 0 or medical.count() > 0):
        return Response({
          'detail':'Disculpe tienes un {}'.format(
            'Permiso por {} aun en vigencia contacte con el jefe de RRHH'.format(perm[0].description) 
            if perm.count() > 0 else 'Reposo por {} aun en vigencia contacte con el jefe de RRHH'.format(medical[0].description)
          )
        },status=400)

      entry = Inandout.objects.create(userData=user,timeIn=timezone.now(), date=timezone.now())         
      
      return Response({
        'detail': 'Bienvenido a la UNEFAB {} {} {} {}'.format(
          entry.userData.fName,entry.userData.sName,entry.userData.fSurname,entry.userData.sSurname
        )
      },status=201)
    
    else:
      if(data['mode'] != 'cam'):
        try:
          user = UserData.objects.get(identification__icontains=data['identification'])            
          password = data['password']
          check_password(password = password, encoded = user.key.key)
        except ValidationError as e:
          return Response({'detail':'Error de contraseña'},status=400)
              
      if(last_visit.timeOutEat == None):
        last_visit.timeOutEat = timezone.now()
        last_visit.save()
        return Response({
          'detail': '¡Que tengas buen provecho! {} {} {} {}'.format(
            last_visit.userData.fName,last_visit.userData.sName,last_visit.userData.fSurname,last_visit.userData.sSurname
          )
        },status=201)
      
      if(last_visit.timeInEat == None):
        last_visit.timeInEat = timezone.now()
        last_visit.save()
        return Response({
          'detail': 'Bienvenido de nuevo {} {} {} {}'.format(
            last_visit.userData.fName,last_visit.userData.sName,last_visit.userData.fSurname,last_visit.userData.sSurname
          )
        },status=201)
      
      if(last_visit.timeOut == None):
        last_visit.timeOut = timezone.now()
        last_visit.save()
        return Response({
          'detail': 'Hasta luego {} {} {} {}'.format(
            last_visit.userData.fName,last_visit.userData.sName,last_visit.userData.fSurname,last_visit.userData.sSurname
          )
        },status=201)

      return Response({'detail':'Disculpe usted ya cumplio con el dia de hoy'},status=400)