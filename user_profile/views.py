from django.shortcuts import render
from rest_framework import viewsets, views, permissions
from rest_framework.response import Response
from rest_framework import status
from .models import *
from .serializers import *
from .utils import JwtToken

class UserProfileModelView(viewsets.ModelViewSet):

    queryset                    = User.objects.all()
    serializer_class            = UserProfileSerializer

class UserAPIView(viewsets.ModelViewSet):
    """
    View to create the user profile

    @author Miguel E. Villamizar R. (mevr02 at gmail.com)
    @copyright Area862
    @date 21-01-19
    @version 2.0
    """
    permission_classes          = []
    queryset                    = User.objects.all()
    serializer_class            = UserProfileSerializer

    def create(self, request, format = None):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()        
        return Response(serializer.data, status=status.HTTP_201_CREATED)

class LoginAPIView(views.APIView):
    """
    View to LoginAPIView  

    @author Miguel Eduardo Villamizar (mevr02 at gmail.com)
    @copyright Area862
    @date 03-02-19
    @version 2.0
    """
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



# Create your views here.
