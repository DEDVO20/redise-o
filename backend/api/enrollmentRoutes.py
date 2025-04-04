from flask import Blueprint, jsonify, request
from backend.models.matriculas import Matricula
from backend.models.base import SessionLocal
from datetime import datetime

enrollmentRoutes = Blueprint('enrollmentRoutes', __name__, url_prefix='/enrollments')

@enrollmentRoutes.route('/', methods=['GET'])
def getEnrollments():
    db = SessionLocal()
    try:
        matriculas = db.query(Matricula).all()
        return jsonify([{
            'id': matricula.id,
            'estudiante_id': matricula.estudiante_id,
            'materia_id': matricula.materia_id,
            'semestre_id': matricula.semestre_id,
            'fecha_inscripcion': matricula.fecha_inscripcion.isoformat() if matricula.fecha_inscripcion else None
        } for matricula in matriculas])
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    finally:
        db.close()

@enrollmentRoutes.route('/<int:id>', methods=['GET'])
def getEnrollment(id):
    db = SessionLocal()
    try:
        matricula = db.query(Matricula).filter(Matricula.id == id).first()
        if not matricula:
            return jsonify({'error': 'Matrícula no encontrada'}), 404
        return jsonify({
            'id': matricula.id,
            'estudiante_id': matricula.estudiante_id,
            'materia_id': matricula.materia_id,
            'semestre_id': matricula.semestre_id,
            'fecha_inscripcion': matricula.fecha_inscripcion.isoformat() if matricula.fecha_inscripcion else None
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    finally:
        db.close()

@enrollmentRoutes.route('/student/<int:estudiante_id>', methods=['GET'])
def getStudentEnrollments(estudiante_id):
    db = SessionLocal()
    try:
        matriculas = db.query(Matricula).filter(Matricula.estudiante_id == estudiante_id).all()
        return jsonify([{
            'id': matricula.id,
            'estudiante_id': matricula.estudiante_id,
            'materia_id': matricula.materia_id,
            'semestre_id': matricula.semestre_id,
            'fecha_inscripcion': matricula.fecha_inscripcion.isoformat() if matricula.fecha_inscripcion else None
        } for matricula in matriculas])
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    finally:
        db.close()

@enrollmentRoutes.route('/subject/<int:materia_id>', methods=['GET'])
def getSubjectEnrollments(materia_id):
    db = SessionLocal()
    try:
        matriculas = db.query(Matricula).filter(Matricula.materia_id == materia_id).all()
        return jsonify([{
            'id': matricula.id,
            'estudiante_id': matricula.estudiante_id,
            'materia_id': matricula.materia_id,
            'semestre_id': matricula.semestre_id,
            'fecha_inscripcion': matricula.fecha_inscripcion.isoformat() if matricula.fecha_inscripcion else None
        } for matricula in matriculas])
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    finally:
        db.close()

@enrollmentRoutes.route('/semester/<int:semestre_id>', methods=['GET'])
def getSemesterEnrollments(semestre_id):
    db = SessionLocal()
    try:
        matriculas = db.query(Matricula).filter(Matricula.semestre_id == semestre_id).all()
        return jsonify([{
            'id': matricula.id,
            'estudiante_id': matricula.estudiante_id,
            'materia_id': matricula.materia_id,
            'semestre_id': matricula.semestre_id,
            'fecha_inscripcion': matricula.fecha_inscripcion.isoformat() if matricula.fecha_inscripcion else None
        } for matricula in matriculas])
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    finally:
        db.close()

@enrollmentRoutes.route('/', methods=['POST'])
def createEnrollment():
    db = SessionLocal()
    try:
        data = request.get_json()
        if not data or 'estudiante_id' not in data or 'materia_id' not in data or 'semestre_id' not in data:
            return jsonify({'error': 'Se requieren ID del estudiante, ID de la materia e ID del semestre'}), 400
            
        nueva_matricula = Matricula(
            estudiante_id=data['estudiante_id'],
            materia_id=data['materia_id'],
            semestre_id=data['semestre_id'],
            fecha_inscripcion=datetime.utcnow()
        )
        db.add(nueva_matricula)
        db.commit()
        db.refresh(nueva_matricula)
        
        return jsonify({
            'id': nueva_matricula.id,
            'estudiante_id': nueva_matricula.estudiante_id,
            'materia_id': nueva_matricula.materia_id,
            'semestre_id': nueva_matricula.semestre_id,
            'fecha_inscripcion': nueva_matricula.fecha_inscripcion.isoformat() if nueva_matricula.fecha_inscripcion else None
        }), 201
    except Exception as e:
        db.rollback()
        return jsonify({'error': str(e)}), 500
    finally:
        db.close()

@enrollmentRoutes.route('/<int:id>', methods=['PUT'])
def updateEnrollment(id):
    db = SessionLocal()
    try:
        matricula = db.query(Matricula).filter(Matricula.id == id).first()
        if not matricula:
            return jsonify({'error': 'Matrícula no encontrada'}), 404
            
        data = request.get_json()
        if 'estudiante_id' in data:
            matricula.estudiante_id = data['estudiante_id']
        if 'materia_id' in data:
            matricula.materia_id = data['materia_id']
        if 'semestre_id' in data:
            matricula.semestre_id = data['semestre_id']
            
        db.commit()
        
        return jsonify({
            'id': matricula.id,
            'estudiante_id': matricula.estudiante_id,
            'materia_id': matricula.materia_id,
            'semestre_id': matricula.semestre_id,
            'fecha_inscripcion': matricula.fecha_inscripcion.isoformat() if matricula.fecha_inscripcion else None
        })
    except Exception as e:
        db.rollback()
        return jsonify({'error': str(e)}), 500
    finally:
        db.close()

@enrollmentRoutes.route('/<int:id>', methods=['DELETE'])
def deleteEnrollment(id):
    db = SessionLocal()
    try:
        matricula = db.query(Matricula).filter(Matricula.id == id).first()
        if not matricula:
            return jsonify({'error': 'Matrícula no encontrada'}), 404
            
        db.delete(matricula)
        db.commit()
        
        return jsonify({'message': 'Matrícula eliminada correctamente'})
    except Exception as e:
        db.rollback()
        return jsonify({'error': str(e)}), 500
    finally:
        db.close()