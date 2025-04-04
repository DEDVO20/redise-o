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
        if not data or 'documento' not in data:
            return jsonify({'error': 'Se requiere el documento del estudiante'}), 400

        estudiante = db.query(Estudiante).filter(Estudiante.documento == data['documento']).first()
        if not estudiante:
            return jsonify({'error': 'Estudiante no encontrado'}), 404

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
        return jsonify({'error': str(e)}), 500
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