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
DD = 'DEDICACIONEXCLUSIVA'


EmployerCategory = (
    (TV, 'Tiempo Variable'),
    (MT, 'Medio Tiempo'),
    (TC, 'Tiempo Completo'),
    (DD, 'Dedicación Exclusiva')
)


"""
Constantes de Estudios realizadados por los Trabajadores 
"""

PREGRADO = 'PREGRADO'
POSTGRADO = 'POSTGRADO'
# COMPONENTEDOCENTE = 'COMPONENTEDOCENTE'
OTROESTUDIO = 'OTROESTUDIO''DEDICACIONEXCLUSIVA'


EmployerStudy = (
    (PREGRADO, 'Pre Grado'),
    (POSTGRADO, 'Post Grado'),
    # (COMPONENTEDOCENTE, 'Componente Docente'),
    (OTROESTUDIO, 'Otro Estudio')
)

"""
Constantes de Componentes Docentes realizadados por los Trabajadores 
"""

VIRTUAL = 'VIRTUAL'
PRESENCIAL = 'PRESENCIAL'


EmployerComponent = (
    (VIRTUAL, 'Virtual'),
    (PRESENCIAL, 'Presencial')
)

