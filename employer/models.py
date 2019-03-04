from django.db import models
from .constants import *

# Create your models here.

"""
Modelo para el Modulo de Trabajadores
"""
class UserData(models.Model):

    identification = models.CharField(verbose_name="Cedula",max_length=12,unique=True)
    fName = models.CharField(verbose_name="Nombre",max_length=32)
    sName = models.CharField(verbose_name="Segundo Nombre",max_length=32,blank=True,null=True)
    fSurname = models.CharField(verbose_name="Apellido",max_length=32)
    sSurname = models.CharField(verbose_name="Segundo apellido",max_length=32,blank=True,null=True)
    birthDate = models.DateField(verbose_name='Fecha de nacimiento')
    email = models.EmailField(verbose_name='Correo electronico',unique=True)
    address = models.CharField(verbose_name="Direccion",max_length=128)
    phone = models.CharField(verbose_name="Celular",max_length=12)
    license = models.BooleanField(verbose_name="Carnet")
    active = models.BooleanField(verbose_name="Activo", default=True)

class Departments(models.Model):
    
    name = models.CharField(verbose_name='Nombre del departamento', max_length=50)
    description = models.CharField(verbose_name='Descripcion del departamento', max_length=50, null=True,blank=True)     

class InstitutionalUserData(models.Model):

    userData = models.OneToOneField(UserData, verbose_name="Empleado", on_delete=models.CASCADE, related_name='institutional')
    dateIn = models.DateField(verbose_name='Fecha de Entrada a la Institución',blank=True, null=True)
    condition = models.CharField(verbose_name="Tipo de Trabajador",max_length=32,choices=EmployerCondition)
    category = models.CharField(verbose_name="Categoria del Trabajador", max_length=32,choices=EmployerCategory)
    appointment = models.CharField(verbose_name="Nombramiento UNEFANB",max_length=120,null=True,blank=True)
    positionOPSU = models.CharField(verbose_name="Cargo OPSU",max_length=120,null=True,blank=True)
    department = models.ForeignKey(Departments, verbose_name="Departamento", on_delete=models.SET_NULL, related_name='departments',null=True,blank=True)


"""
Modelo para el registro de incidencias
"""

class IncidentsEmployer(models.Model):

    userData = models.ForeignKey(UserData, verbose_name="Empleado", on_delete=models.CASCADE, related_name='servicescomission')
    reportDate = models.DateField(verbose_name='Fecha de Reporte', blank=True, null=True)
    startDate = models.DateField(verbose_name='Fecha de Inicio', blank=True, null=True)
    endDate = models.DateField(verbose_name='Fecha de Culminacion',blank=True, null=True)
    description = models.CharField(verbose_name='Descripcion del ', max_length=200, null=True,blank=True)
    approvedBoss = models.BooleanField(verbose_name="Aprobado por el Jefe Inmediato")
    observation = models.CharField(verbose_name='Observación', max_length=200, null=True,blank=True)



