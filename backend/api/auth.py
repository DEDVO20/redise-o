from functools import wraps
from flask import Blueprint, jsonify, request
from flask_jwt_extended import JWTManager, create_access_token, get_jwt_identity, jwt_required
from backend.models.base import SessionLocal
from backend.models.estudiantes import Estudiante
from datetime import timedelta

auth = Blueprint('auth', __name__, url_prefix='/api/auth')
jwt = JWTManager()

@auth.route('/login', methods=['POST'])
def login():
    db = SessionLocal()
    try:
        data = request.get_json()
        if not data or 'documento' not in data or 'password' not in data:
            return jsonify({'error': 'Se requieren documento y contraseña del estudiante'}), 400

        # Buscar estudiante por documento
        estudiante = db.query(Estudiante).filter(Estudiante.documento == data['documento']).first()
        if not estudiante:
            return jsonify({'error': 'Estudiante no encontrado'}), 404
            
        # Verificar si el estudiante tiene contraseña
        if not estudiante.password:
            return jsonify({'error': 'Este usuario no tiene contraseña configurada. Por favor contacte al administrador.'}), 401
            
        # Verificar contraseña
        try:
            if not estudiante.check_password(data['password']):
                return jsonify({'error': 'Contraseña incorrecta'}), 401
        except Exception as password_error:
            # Log del error específico de verificación de contraseña
            print(f"Error al verificar contraseña: {str(password_error)}")
            return jsonify({'error': 'Error al verificar credenciales. Por favor contacte al administrador del sistema.'}), 500

        # Crear token JWT
        access_token = create_access_token(
            identity=estudiante.id,
            expires_delta=timedelta(days=1)
        )

        return jsonify({
            'token': access_token,
            'estudiante': estudiante.to_dict()
        })
    except Exception as e:
        print(f"Error en login: {str(e)}")
        return jsonify({'error': 'Error interno del servidor. Por favor intente nuevamente más tarde.'}), 500
    finally:
        db.close()

def role_required(roles):
    def decorator(fn):
        @wraps(fn)
        def wrapper(*args, **kwargs):
            db = SessionLocal()
            try:
                estudiante_id = get_jwt_identity()
                estudiante = db.query(Estudiante).filter(Estudiante.id == estudiante_id).first()
                
                if not estudiante:
                    return jsonify({'error': 'Estudiante no encontrado'}), 404
                
                if estudiante.rol_id not in roles:
                    return jsonify({'error': 'No tiene permisos para realizar esta acción'}), 403
                
                return fn(*args, **kwargs)
            finally:
                db.close()
        return wrapper
    return decorator