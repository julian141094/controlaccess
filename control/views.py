from rest_framework import viewsets,views
from .serializers import *
from rest_framework import filters

class InAndOutModelView(viewsets.ModelViewSet):
    
    queryset                    = Inandout.objects.all()
    serializer_class            = InAndOutSerializer

class InAndOutApiView(views.APIView):

    serializer_class = InAndOutSerializer

    def post(self, request, format=None):