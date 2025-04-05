from functools import wraps
from flask import request, jsonify
import logging
from datetime import datetime

# Configuración del logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def log_request(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        # Log de la petición
        request_data = {
            'method': request.method,
            'url': request.url,
            'headers': dict(request.headers),
            'body': request.get_json() if request.is_json else None,
            'timestamp': datetime.now().isoformat()
        }
        logger.info(f'Request: {request_data}')

        # Ejecutar la función
        response = f(*args, **kwargs)

        # Log de la respuesta
        logger.info(f'Response: {response}')
        return response

    return decorated_function

def handle_errors(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        try:
            return f(*args, **kwargs)
        except Exception as e:
            logger.error(f'Error: {str(e)}')
            return jsonify({
                'error': 'Error interno del servidor',
                'message': str(e)
            }), 500

    return decorated_function

def validate_json(required_fields=[]):
    def decorator(f):
        @wraps(f)
        def decorated_function(*args, **kwargs):
            if not request.is_json:
                return jsonify({
                    'error': 'Se requiere contenido JSON'
                }), 400

            data = request.get_json()
            missing_fields = [field for field in required_fields if field not in data]

            if missing_fields:
                return jsonify({
                    'error': 'Campos requeridos faltantes',
                    'missing_fields': missing_fields
                }), 400

            return f(*args, **kwargs)
        return decorated_function
    return decorator