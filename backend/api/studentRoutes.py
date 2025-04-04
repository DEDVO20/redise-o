from flask import Blueprint, jsonify, request
from backend.models.estudiantes import Estudiante
from backend.models.base import SessionLocal

studentRoutes = Blueprint('studentRoutes', __name__, url_prefix='/students')

@studentRoutes.route('/', methods=['GET'])
def getStudents():
    db = SessionLocal()
    estudiantes = db.query(Estudiante).all()
    db.close()
    return jsonify([e.to_dict() for e in estudiantes])

@studentRoutes.route('/', methods=['POST'])
def createStudent():
    db = SessionLocal()
    try:
        data = request.get_json()
        if not data or 'nombre' not in data or 'documento' not in data:
            return jsonify({'error': 'Se requieren nombre y documento del estudiante'}), 400
            
        nuevo_estudiante = Estudiante(
            nombre=data['nombre'],
            documento=data['documento'],
            correo=data.get('correo'),
            foto_url=data.get('foto_url'),
            carrera_id=data.get('carrera_id'),
            rol_id=data.get('rol_id'),
            estado=data.get('estado', 'Activo')
        )
        db.add(nuevo_estudiante)
        db.commit()
        db.refresh(nuevo_estudiante)
        
        return jsonify(nuevo_estudiante.to_dict()), 201
    except Exception as e:
        db.rollback()
        return jsonify({'error': str(e)}), 500
    finally:
        db.close()
