from rest_framework import serializers
from django.contrib.auth.models import (User)
# from .models import *
from django.db.models import Q

class UserProfileSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('pk', 'password', 'last_login', 'is_superuser', 'username', 
        'first_name', 'last_name', 'email', 'is_staff', 'is_active', 'is_active', 'date_joined')

class LoginSerializer(serializers.Serializer):
   
    username = serializers.CharField(label=("Username"))
    password = serializers.CharField(label=("Password"),
                                     style={'input_type': 'password'})

    def validate(self, attrs):
        """
        Meethod for validated of return serializer is correct
        @param attrs object with field for validate
        @return attrs object that contain the serializer validated
        """
        username = attrs.get('username')
        password = attrs.get('password')

        if username and password:
            user = User.objects.filter(
                Q(username__iexact=username)|
                Q(email__iexact=username)
            ).distinct()

            if user:
                user = user.first()
                if user.check_password(password):
                    if not user.is_active:
                        msg = 'El usuario no esta activo!'
                        raise serializers.ValidationError(msg)
                else:
                    msg = 'Contraseña Incorrecta!'
                    raise serializers.ValidationError(msg)
            else:
                raise serializers.ValidationError('Credenciales Invalidas!')
        else:
            msg = 'Debe Incluir "Nombre de Usuario" y "Contraseña".'
            raise serializers.ValidationError(msg)

        attrs['user'] = user
        return attrs
