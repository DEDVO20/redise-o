from flask import Blueprint, jsonify, request
from backend.models.notas import Nota
from backend.models.matriculas import Matricula
from backend.models.base import SessionLocal

gradeRoutes = Blueprint('gradeRoutes', __name__, url_prefix='/grades')

@gradeRoutes.route('/', methods=['GET'])
def getGrades():
    db = SessionLocal()
    try:
        notas = db.query(Nota).all()
        return jsonify([{
            'id': nota.id,
            'matricula_id': nota.matricula_id,
            'calificacion': float(nota.calificacion) if nota.calificacion is not None else None
        } for nota in notas])
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    finally:
        db.close()

@gradeRoutes.route('/<int:id>', methods=['GET'])
def getGrade(id):
    db = SessionLocal()
    try:
        nota = db.query(Nota).filter(Nota.id == id).first()
        if not nota:
            return jsonify({'error': 'Nota no encontrada'}), 404
        return jsonify({
            'id': nota.id,
            'matricula_id': nota.matricula_id,
            'calificacion': float(nota.calificacion) if nota.calificacion is not None else None
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    finally:
        db.close()

@gradeRoutes.route('/enrollment/<int:matricula_id>', methods=['GET'])
def getEnrollmentGrades(matricula_id):
    db = SessionLocal()
    try:
        notas = db.query(Nota).filter(Nota.matricula_id == matricula_id).all()
        return jsonify([{
            'id': nota.id,
            'matricula_id': nota.matricula_id,
            'calificacion': float(nota.calificacion) if nota.calificacion is not None else None
        } for nota in notas])
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    finally:
        db.close()

@gradeRoutes.route('/student/<int:estudiante_id>', methods=['GET'])
def getStudentGrades(estudiante_id):
    db = SessionLocal()
    try:
        # Primero obtenemos todas las matrículas del estudiante
        matriculas = db.query(Matricula).filter(Matricula.estudiante_id == estudiante_id).all()
        matricula_ids = [matricula.id for matricula in matriculas]
        
        # Luego obtenemos todas las notas asociadas a esas matrículas
        notas = db.query(Nota).filter(Nota.matricula_id.in_(matricula_ids)).all()
        
        return jsonify([{
            'id': nota.id,
            'matricula_id': nota.matricula_id,
            'calificacion': float(nota.calificacion) if nota.calificacion is not None else None
        } for nota in notas])
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    finally:
        db.close()

@gradeRoutes.route('/', methods=['POST'])
def createGrade():
    db = SessionLocal()
    try:
        data = request.get_json()
        if not data or 'matricula_id' not in data or 'calificacion' not in data:
            return jsonify({'error': 'Se requieren ID de la matrícula y calificación'}), 400
            
        # Verificar que la matrícula existe
        matricula = db.query(Matricula).filter(Matricula.id == data['matricula_id']).first()
        if not matricula:
            return jsonify({'error': 'La matrícula especificada no existe'}), 404
            
        nueva_nota = Nota(
            matricula_id=data['matricula_id'],
            calificacion=data['calificacion']
        )
        db.add(nueva_nota)
        db.commit()
        db.refresh(nueva_nota)
        
        return jsonify({
            'id': nueva_nota.id,
            'matricula_id': nueva_nota.matricula_id,
            'calificacion': float(nueva_nota.calificacion) if nueva_nota.calificacion is not None else None
        }), 201
    except Exception as e:
        db.rollback()
        return jsonify({'error': str(e)}), 500
    finally:
        db.close()

@gradeRoutes.route('/<int:id>', methods=['PUT'])
def updateGrade(id):
    db = SessionLocal()
    try:
        nota = db.query(Nota).filter(Nota.id == id).first()
        if not nota:
            return jsonify({'error': 'Nota no encontrada'}), 404
            
        data = request.get_json()
        if 'calificacion' in data:
            nota.calificacion = data['calificacion']
        if 'matricula_id' in data:
            # Verificar que la matrícula existe
            matricula = db.query(Matricula).filter(Matricula.id == data['matricula_id']).first()
            if not matricula:
                return jsonify({'error': 'La matrícula especificada no existe'}), 404
            nota.matricula_id = data['matricula_id']
            
        db.commit()
        
        return jsonify({
            'id': nota.id,
            'matricula_id': nota.matricula_id,
            'calificacion': float(nota.calificacion) if nota.calificacion is not None else None
        })
    except Exception as e:
        db.rollback()
        return jsonify({'error': str(e)}), 500
    finally:
        db.close()

@gradeRoutes.route('/<int:id>', methods=['DELETE'])
def deleteGrade(id):
    db = SessionLocal()
    try:
        nota = db.query(Nota).filter(Nota.id == id).first()
        if not nota:
            return jsonify({'error': 'Nota no encontrada'}), 404
            
        db.delete(nota)
        db.commit()
        
        return jsonify({'message': 'Nota eliminada correctamente'})
    except Exception as e:
        db.rollback()
        return jsonify({'error': str(e)}), 500
    finally:
        db.close()