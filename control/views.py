from rest_framework import viewsets,views,filters,status,permissions
from .serializers import *
from rest_framework.response import Response
from django.utils import timezone
# importamos UserData del modelo de Employer (App)
from employer.models import UserData
from django.core import serializers

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
        last_visit = Inandout.objects.filter(userData__identification__icontains = data['identification'],
            date=timezone.now(),timeOut=None
        ).first()
        if(last_visit == None):
            user = UserData.objects.get(identification__icontains=data['identification'])
            if not(user):
                return Response({
                    'detail':'Esta cédula no a sido registrado por favor contacte con el jefe de RRHH'
                },status=400)
            
            if not(user.active):
                return Response({'detail':'Lo siento pero no puedes ingresar contacta con el jefe de RRHH'},status=400)
            
            entry = Inandout.objects.create(userData=user,timeIn=timezone.now(), date=timezone.now())         
            return Response({
                'detail': 'Bienvenido a la UNEFAB'
            },status=201)
        else:
            if(last_visit.timeOutEat == None):
                last_visit.timeOutEat = timezone.now()
                last_visit.save()
                return Response({
                    'detail': '¡Que tengas buen provecho!'
                },status=201)
            if(last_visit.timeInEat == None):
                last_visit.timeInEat = timezone.now()
                last_visit.save()
                return Response({
                    'detail': 'Bienvenido de nuevo'
                },status=201)
            if(last_visit.timeOut == None):
                last_visit.timeOut = timezone.now()
                last_visit.save()
                return Response({
                    'detail': 'Hasta luego'
                },status=201)
        # if(request[mode] != 'cam'):
