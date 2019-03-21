from rest_framework import serializers
from django.contrib.auth.models import (User)
# from .models import *
from django.db.models import Q
from django.db import transaction, IntegrityError
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError

class UserProfileSerializer(serializers.ModelSerializer):
    """
    Class to serialize User model

    @author Miguel E. Villamizar (mevr02 at gmail.com)
    @copyright Area862
    @date 21-01-19 (dd-mm-YY)
    @version 2.0
    """
    password = serializers.CharField(
        style={'input_type': 'password'},
        write_only=True
    )
    class Meta:
        model = User
        fields = tuple(User.REQUIRED_FIELDS) + (
            User.USERNAME_FIELD, User._meta.pk.name,'last_name','first_name','password','is_active'
        )

    def validate(self,attrs):
        user = User(**attrs)
        password = attrs.get('password')
        if User.objects.filter(email = attrs.get('email')):
            msg = "Este Correo ya a sido registrado!"
            raise serializers.ValidationError({'non_field_errors': msg})
        try:
            validate_password(password, user)
        except ValidationError as e:
            serializer_error = serializers.as_serializer_error(e)
            raise serializers.ValidationError({
                'non_field_errors': serializer_error['non_field_errors']
            })
        return attrs

    def create(self, validated_data):
        try:
            user = self.perform_create(validated_data)
        except IntegrityError:
            self.fail('Usuario no puede ser creado')
        return user

    def perform_create(self, validated_data):
        with transaction.atomic():
            user = User.objects.create_user(**validated_data)
        return user

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
