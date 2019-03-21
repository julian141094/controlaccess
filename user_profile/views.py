from django.shortcuts import render
from rest_framework import viewsets, views, permissions
from rest_framework.response import Response
from rest_framework import status
from .models import *
from .serializers import *
from .utils import JwtToken

class UserAPIView(viewsets.ModelViewSet):
  
    permission_classes          = []
    queryset                    = User.objects.all()
    serializer_class            = UserProfileSerializer

    def create(self, request, format = None):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()        
        return Response(serializer.data, status=status.HTTP_201_CREATED)

class LoginAPIView(views.APIView):
 
    permission_classes = [permissions.AllowAny]
    serializer_class = LoginSerializer

    def post(self, request, format=None):
    
        if request.user.is_authenticated:
            return Response({'non_field_errors':['Ya estas Autenticado']}, status=400)
        # data = request.data
        # username = data.get('username')
        # password = data.get('password')
        
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        
        return Response(JwtToken(user),status=201)