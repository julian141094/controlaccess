from rest_framework import viewsets
from .serializers import *

class UserDataModelView(viewsets.ModelViewSet):
    
    queryset                    = UserData.objects.all()
    serializer_class            = UserDataSerializer
