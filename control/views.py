from rest_framework import viewsets,views,filters,status
from .serializers import *
from rest_framework.response import Response

class InAndOutModelView(viewsets.ModelViewSet):
    
    queryset                    = Inandout.objects.all()
    serializer_class            = InAndOutSerializer

class InAndOutApiView(views.APIView):

    serializer_class = InAndOutSerializer

    def post(self, request, format=None):
        data = request.data
        last_visit = Inandout.objects.get(userData__identification__iexact = data['identification'])
        # if(request[mode] == 'cam'):