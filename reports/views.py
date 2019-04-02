from django_weasyprint import WeasyTemplateResponseMixin
from django.views.generic import TemplateView
from django.conf import settings
from employer.models import UserData
from control.models import Inandout
from django.db.models import Q
# Create your views here.
class GenerateReport(TemplateView, WeasyTemplateResponseMixin):
  template_name = "report.html"
  pdf_stylesheets = [
    settings.BASE_DIR + '/static/css/pdf.css',
    settings.BASE_DIR + '/static/css/Bootstrap.css'
  ]

  def get_context_data(self,**kwargs):
    context = super().get_context_data(**kwargs)
    context["headers"] = ["Cédula",'Nombre','Tipo','Categoria','Departamento','Fecha Ingreso'] 
    if('type' in self.request.GET):
      employer = UserData.objects.order_by('-identification').filter(institutional__condition__icontains = self.request.GET['type'])
    else:
      employer = UserData.objects.order_by('-identification').all()
    context['employer'] = employer
    return context

class GeneralAccessControlReport(TemplateView, WeasyTemplateResponseMixin):
  template_name = "generalAC.html"
  pdf_stylesheets = [
    settings.BASE_DIR + '/static/css/pdf.css',
    settings.BASE_DIR + '/static/css/Bootstrap.css'
  ]

  def get_context_data(self,**kwargs):
    print('hola',self.request.GET)
    context = super().get_context_data(**kwargs)
    context["headers"] = ["Cédula",'Nombre','Tipo','Fecha','Hr Ent.','Hr Sal.','Hr Trab.'] 
    if('start' in self.request.GET and 'end' in self.request.GET):
      context['entries'] = Inandout.objects.order_by('date').filter(
        Q(date__gte = self.request.GET['start'])&(Q(date__lte = self.request.GET['end']))
      )
      context['start'] = self.request.GET['start']
      context['end'] = self.request.GET['end']
    return context