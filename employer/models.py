from django.db import models
from .constants import *
from django.contrib.auth.models import User

# Create your models here.

"""
Modelo para el Modulo de Trabajadores
"""
class UserData(models.Model):

    identification = models.CharField(verbose_name="Cedula",max_length=12,unique=True)
    fName = models.CharField(verbose_name="Primer Nombre",max_length=32,blank=True,null=True)
    sName = models.CharField(verbose_name="Segundo Nombre",max_length=32,blank=True,null=True)
    fSurname = models.CharField(verbose_name="Segundo apellido",max_length=32,blank=True,null=True)
    sSurname = models.CharField(verbose_name="Segundo apellido",max_length=32,blank=True,null=True)
    birthDate = models.DateField(verbose_name='Fecha de nacimiento')
    # email = models.CharField(verbose_name="Correo",max_length=128, unique=True)
    address = models.CharField(verbose_name="Direccion",max_length=128)
    phone = models.CharField(verbose_name="Celular",max_length=12)
    license = models.BooleanField(verbose_name="Carnet")
    active = models.BooleanField(verbose_name="Activo", default=True)
    # user = models.OneToOneField(User,verbose_name="Usuario", on_delete=models.CASCADE,related_name='userData',null=True,blank=True)

class ExtraUserData(models.Model):
    
    userData = models.OneToOneField(UserData, verbose_name="Empleado", on_delete=models.CASCADE,related_name='extra')
    codCPatria = models.IntegerField("Codigo del carnet",null=True,blank=True)
    serCPatria = models.IntegerField("Serial del carnet",null=True,blank=True)
    whatsapp = models.CharField(verbose_name="Whatsapp",max_length=14,null=True,blank=True)
    facebook = models.CharField(verbose_name="Facebook",max_length=64,null=True,blank=True)
    instagram = models.CharField(verbose_name="Instagram",max_length=32,null=True,blank=True)
    twitter = models.CharField(verbose_name="Twitter",max_length=32,null=True,blank=True)

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


class StudyUserData(models.Model):

    userData = models.ForeignKey(UserData, verbose_name="Empleado", on_delete=models.CASCADE, related_name='study')
    typeStudy = models.CharField(verbose_name="Tipo de Estudio", max_length=15, choices=EmployerStudy)
    startDate = models.DateField(verbose_name='Fecha de inicio',null=True,blank=True)
    endDate = models.DateField(verbose_name='Fecha de culminacion',blank=True, null=True)
    study = models.CharField(verbose_name="Estudios del Trabajador",max_length=60)

class TeachingComponentUserData(models.Model):

    userData = models.ForeignKey(UserData, verbose_name="Empleado", on_delete=models.CASCADE, related_name='teaching')
    typeComponent = models.CharField(verbose_name="Tipo: Virtual o Presencial", max_length=12, blank=True, null=True, choices=EmployerComponent)
    universityOrigin = models.CharField(verbose_name="Universidad de Origen", max_length=60, blank=True, null=True)
    startDate = models.DateField(verbose_name='Fecha de inicio', blank=True, null=True)
    endDate = models.DateField(verbose_name='Fecha de culminacion',blank=True, null=True)
    observation = models.CharField(verbose_name="Observacion", blank=True, null=True, max_length=60)

"""
Modelo para el Modulo de Permisos
"""

class PermissionsEmployer(models.Model):

    userData = models.ForeignKey(UserData, verbose_name="Empleado", on_delete=models.CASCADE, related_name='permissions')
    inDate = models.DateField(verbose_name='Fecha de Solicitud', blank=True, null=True)
    startDate = models.DateField(verbose_name='Fecha de Inicio', blank=True, null=True)
    endDate = models.DateField(verbose_name='Fecha de Culminacion',blank=True, null=True)
    description = models.CharField(verbose_name='Descripcion del Trabajador', max_length=100, null=True,blank=True)
    approvedBoss = models.BooleanField(verbose_name="Aprobado por el Jefe Inmediato",blank=True, null=True)
    commentBoss = models.CharField(verbose_name='Comentario del Jefe Inmediato', max_length=100, null=True,blank=True)
    approvedBossTH = models.BooleanField(verbose_name="Aprobado por el Jefe de Talento Humano",blank=True, null=True)
    commentBossTH = models.CharField(verbose_name='Comentario del Jefe de Talento Humano', max_length=100, null=True,blank=True)
    approvedFinished = models.BooleanField(verbose_name="Aprobado por Decanato y Talento Humano")
    commentFinished = models.CharField(verbose_name='Comentario Superior', max_length=100, null=True,blank=True)

"""
Modelo para el Modulo de Reposos
"""

class MedicalRestEmployer(models.Model):

    userData = models.ForeignKey(UserData, verbose_name="Empleado", on_delete=models.CASCADE, related_name='medicalrest')
    approvedBoss = models.BooleanField(verbose_name="Aprobado por el Jefe Inmediato")
    reportDate = models.DateField(verbose_name='Fecha de Reporte', blank=True, null=True)
    startDate = models.DateField(verbose_name='Fecha de Inicio', blank=True, null=True)
    endDate = models.DateField(verbose_name='Fecha de Culminacion',blank=True, null=True)
    description = models.CharField(verbose_name='Descripcion de la Causa', max_length=200, null=True,blank=True)
    observation = models.CharField(verbose_name='Observación', max_length=200, null=True,blank=True)

"""
Modelo para la Comisión de Servicios
"""

class ServicesCommissionEmployer(models.Model):

    userData = models.ForeignKey(UserData, verbose_name="Empleado", on_delete=models.CASCADE, related_name='servicescomission')
    reportDate = models.DateField(verbose_name='Fecha de Reporte', blank=True, null=True)
    startDate = models.DateField(verbose_name='Fecha de Inicio', blank=True, null=True)
    endDate = models.DateField(verbose_name='Fecha de Culminacion',blank=True, null=True)
    description = models.CharField(verbose_name='Descripcion del ', max_length=200, null=True,blank=True)
    approvedBoss = models.BooleanField(verbose_name="Aprobado por el Jefe Inmediato", null=True,blank=True)
    approvedFinished = models.BooleanField(verbose_name="Aprobado por el Decano", null=True,blank=True)
    observation = models.CharField(verbose_name='Observación', max_length=200, null=True,blank=True)



