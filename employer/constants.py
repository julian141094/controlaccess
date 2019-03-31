"""
Constantes de Condicion de los Trabajadores 
"""

ADMINISTRATIVO = 'ADMINISTRATIVO'
OBRERO = 'OBRERO'
DOCENTE = 'DOCENTE'

EmployerCondition = (
    (ADMINISTRATIVO, 'Administrativo'),
    (OBRERO, 'Obrero'),
    (DOCENTE, 'Docente'),
)

"""
Constantes de Categorias de los Trabajadores 
"""

TV = 'TIEMPOVARIABLE'
MT = 'MEDIOTIEMPO'
TC = 'TIEMPOCOMPLETO'
DE = 'DEDICACIONEXCLUSIVA'
NA = 'NOAPLICA'

EmployerCategory = (
    (TV, 'Tiempo Variable'),
    (MT, 'Medio Tiempo'),
    (TC, 'Tiempo Completo'),
    (DE, 'Dedicación Exclusiva'),
    (NA, 'No Aplica')
)

"""
Constantes de Estudios realizadados por los Trabajadores 
"""
BACHILLERATO = 'BACHILLERATO'
TSU = 'TSU'
PREGRADO = 'PREGRADO'
POSTGRADO = 'POSTGRADO'
COMPONENTEDOCENTE = 'COMPONENTEDOCENTE'
OTROESTUDIO = 'OTROESTUDIO''DEDICACIONEXCLUSIVA'

EmployerStudy = (
    (BACHILLERATO, 'Bachillerato'),
    (TSU, 'Tecnico Superior Universitario'),
    (PREGRADO, 'Pre Grado'),
    (POSTGRADO, 'Post Grado'),
    (COMPONENTEDOCENTE, 'Componente Docente'),
    (OTROESTUDIO, 'Otro Estudio')
)

"""
Constantes de Componentes Docentes realizadados por los Trabajadores 
"""

VIRTUAL = 'VIRTUAL'
PRESENCIAL = 'PRESENCIAL'
NA = 'NOAPLICA'

EmployerComponent = (
    (VIRTUAL, 'Virtual'),
    (PRESENCIAL, 'Presencial'),
    (NA, 'No Aplica')
)

