from flask import Blueprint

api = Blueprint('api', __name__)

# Importar todas las rutas
from .studentRoutes import studentRoutes
from .careerRoutes import careerRoutes
from .roleRoutes import roleRoutes
from .subjectRoutes import subjectRoutes
from .semesterRoutes import semesterRoutes
from .enrollmentRoutes import enrollmentRoutes
from .gradeRoutes import gradeRoutes
from .paymentRoutes import paymentRoutes

# Registrar todos los blueprints
api.register_blueprint(studentRoutes)
api.register_blueprint(careerRoutes)
api.register_blueprint(roleRoutes)
api.register_blueprint(subjectRoutes)
api.register_blueprint(semesterRoutes)
api.register_blueprint(enrollmentRoutes)
api.register_blueprint(gradeRoutes)
api.register_blueprint(paymentRoutes)


