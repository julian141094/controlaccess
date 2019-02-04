from django.db import models

# Create your models here.
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

class ExtraUserData(models.Model):
    
    userData = models.ForeignKey(UserData, verbose_name="Empleado", on_delete=models.CASCADE,related_name='extra')
    codCPatria = models.IntegerField("Codigo del carnet",null=True,blank=True)
    serCPatria = models.IntegerField("Serial del carnet",null=True,blank=True)
    whatsapp = models.CharField(verbose_name="Whatsapp",max_length=14,null=True,blank=True)
    facebook = models.CharField(verbose_name="Facebook",max_length=64,null=True,blank=True)
    instagram = models.CharField(verbose_name="Instagram",max_length=32,null=True,blank=True)
    twitter = models.CharField(verbose_name="Twitter",max_length=32,null=True,blank=True)

class InstitutionalUserData(models.Model):

    ADMINISTRATIVO = 'ADMINISTRATIVO'
    OBRERO = 'OBRERO'

    DOCENTE = 'DOCENTE'
    TV = 'TIEMPOVARIABLE'
    MT = 'MEDIOTIEMPO'
    TC = 'TIEMPOCOMPLETO'
    DD = 'DEDICACIONEXCLUSIVA'

    userData = models.ForeignKey(UserData, verbose_name="Empleado", on_delete=models.CASCADE, related_name='institutional')
    dateIn = models.DateField(verbose_name='Fecha de Entrada a la Institución')
    condition = models.CharField(verbose_name="Tipo de Trabajador",max_length=32,choices=(
        (ADMINISTRATIVO, 'Administrativo'),
        (OBRERO, 'Obrero'),
        (DOCENTE, 'Docente'),
        )
    )
    category = models.CharField(verbose_name="Categoria del Trabajador", max_length=32,choices=(
        (TV, 'Tiempo Variable'),
        (MT, 'Medio Tiempo'),
        (TC, 'Tiempo Completo'),
        (DD, 'Dedicación Exclusiva')
        )
    )
    appointment = models.CharField(verbose_name="Nombramiento UNEFANB",max_length=120,null=True,blank=True)
    positionOPSU = models.CharField(verbose_name="Cargo OPSU",max_length=120,null=True,blank=True)


class StudyUserData(models.Model):

    PREGRADO = 'PREGRADO'
    POSTGRADO = 'POSTGRADO'
    OTROESTUDIO = 'OTROESTUDIO'

    userData = models.ForeignKey(UserData, verbose_name="Empleado", on_delete=models.CASCADE, related_name='study')
    typeStudy = models.CharField(verbose_name="Tipo de Estudio", max_length=15, choices=(
        (PREGRADO, 'Pre Grado'),
        (POSTGRADO, 'Post Grado'),
        (OTROESTUDIO, 'Otro Estudio')
        )
    )
    startDate = models.DateField(verbose_name='Fecha de inicio',null=True,blank=True)
    endDate = models.DateField(verbose_name='Fecha de culminacion',blank=True, null=True)
    study = models.CharField(verbose_name="Estudios del Trabajador",max_length=60)

class TeachingComponentUserData(models.Model):

    VIRTUAL = 'VIRTUAL'
    PRESENCIAL = 'PRESENCIAL'

    userData = models.ForeignKey(UserData, verbose_name="Empleado", on_delete=models.CASCADE, related_name='teaching')
    typeComponent = models.CharField(verbose_name="Tipo: Virtual o Presencial", max_length=12, blank=True, null=True, choices=(
        (VIRTUAL, 'Virtual'),
        (PRESENCIAL, 'Presencial')
        )
    )
    universityOrigin = models.CharField(verbose_name="Universidad de Origen", max_length=60, blank=True, null=True)
    startDate = models.DateField(verbose_name='Fecha de inicio', blank=True, null=True)
    endDate = models.DateField(verbose_name='Fecha de culminacion',blank=True, null=True)
    observation = models.CharField(verbose_name="Observacion", blank=True, null=True, max_length=60)
