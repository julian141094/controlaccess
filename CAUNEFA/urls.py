"""CAUNEFA URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from employer.views import (UserDataModelView,
    DepartmentsModelView,PermissionsEmployerModelView,MedicalRestEmployerModelView,ServicesCommissionEmployerModelView
)

rout = routers.DefaultRouter()
rout.register(r'UserData',UserDataModelView)
#Aqui registro todas las rutas que necesito para interacciones con el backend
rout.register(r'Departments',DepartmentsModelView)
rout.register(r'Permisions',PermissionsEmployerModelView)
rout.register(r'MedicalRest',MedicalRestEmployerModelView)
rout.register(r'ServicesCommission',ServicesCommissionEmployerModelView)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/',include(rout.urls))
]
