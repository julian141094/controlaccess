from django_weasyprint import WeasyTemplateResponseMixin
from django.views.generic import TemplateView
from django.conf import settings
# Create your views here.
class GenerateReport(TemplateView, WeasyTemplateResponseMixin):

    template_name = "report.html"
    pdf_stylesheets = [
        settings.BASE_DIR + '/static/css/pdf.css',
        settings.BASE_DIR + '/static/css/Bootstrap.css',        
    ]

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["headers"] = ["Nombre",'Fecha','Hr Entrada','Hr de Comer','Hr reingreso','Hr salida'] 
        return context
    