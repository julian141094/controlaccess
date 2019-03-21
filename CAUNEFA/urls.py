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
from reports.views import GenerateReport
from control.views import (InAndOutModelView,InAndOutApiView)
from user_profile.views import (UserAPIView, LoginAPIView)
from rest_framework_jwt.views import refresh_jwt_token
from django.contrib.staticfiles.urls import staticfiles_urlpatterns

rout = routers.DefaultRouter()
rout.register(r'UserData',UserDataModelView)
#Aqui registro todas las rutas que necesito para interacciones con el backend
rout.register(r'Departments',DepartmentsModelView)
rout.register(r'Permisions',PermissionsEmployerModelView)
rout.register(r'MedicalRest',MedicalRestEmployerModelView)
rout.register(r'ServicesCommission',ServicesCommissionEmployerModelView)
rout.register(r'Access',InAndOutModelView)
rout.register(r'User_Profile', UserAPIView)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/',include(rout.urls)),
    path('api/inandout/',InAndOutApiView.as_view()),
    path('api/login/',LoginAPIView.as_view()),
    path('api/api-token-refresh/', refresh_jwt_token),
    path('generate/pdf/', GenerateReport.as_view(), name='generate_pdf'),
]

urlpatterns += staticfiles_urlpatterns()
