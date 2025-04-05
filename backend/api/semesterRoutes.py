from flask import Blueprint, jsonify, request
from backend.models.semestres import Semestre
from backend.models.base import SessionLocal

semesterRoutes = Blueprint('semesterRoutes', __name__, url_prefix='/semesters')

@semesterRoutes.route('/', methods=['GET'])
def getSemesters():
    db = SessionLocal()
    try:
        semestres = db.query(Semestre).all()
        return jsonify([{
            'id': semestre.id,
            'numero': semestre.numero,
            'anio': semestre.anio,
            'periodo': semestre.periodo,
            'estudiante_id': semestre.estudiante_id
        } for semestre in semestres])
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    finally:
        db.close()

@semesterRoutes.route('/<int:id>', methods=['GET'])
def getSemester(id):
    db = SessionLocal()
    try:
        semestre = db.query(Semestre).filter(Semestre.id == id).first()
        if not semestre:
            return jsonify({'error': 'Semestre no encontrado'}), 404
        return jsonify({
            'id': semestre.id,
            'numero': semestre.numero,
            'anio': semestre.anio,
            'periodo': semestre.periodo,
            'estudiante_id': semestre.estudiante_id
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    finally:
        db.close()

@semesterRoutes.route('/student/<int:estudiante_id>', methods=['GET'])
def getStudentSemesters(estudiante_id):
    db = SessionLocal()
    try:
        semestres = db.query(Semestre).filter(Semestre.estudiante_id == estudiante_id).all()
        return jsonify([{
            'id': semestre.id,
            'numero': semestre.numero,
            'anio': semestre.anio,
            'periodo': semestre.periodo,
            'estudiante_id': semestre.estudiante_id
        } for semestre in semestres])
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    finally:
        db.close()

@semesterRoutes.route('/', methods=['POST'])
def createSemester():
    db = SessionLocal()
    try:
        data = request.get_json()
        if not data or 'numero' not in data or 'anio' not in data or 'periodo' not in data or 'estudiante_id' not in data:
            return jsonify({'error': 'Se requieren número, año, periodo y ID del estudiante'}), 400
            
        nuevo_semestre = Semestre(
            numero=data['numero'],
            anio=data['anio'],
            periodo=data['periodo'],
            estudiante_id=data['estudiante_id']
        )
        db.add(nuevo_semestre)
        db.commit()
        db.refresh(nuevo_semestre)
        
        return jsonify({
            'id': nuevo_semestre.id,
            'numero': nuevo_semestre.numero,
            'anio': nuevo_semestre.anio,
            'periodo': nuevo_semestre.periodo,
            'estudiante_id': nuevo_semestre.estudiante_id
        }), 201
    except Exception as e:
        db.rollback()
        return jsonify({'error': str(e)}), 500
    finally:
        db.close()

@semesterRoutes.route('/<int:id>', methods=['PUT'])
def updateSemester(id):
    db = SessionLocal()
    try:
        semestre = db.query(Semestre).filter(Semestre.id == id).first()
        if not semestre:
            return jsonify({'error': 'Semestre no encontrado'}), 404
            
        data = request.get_json()
        if 'numero' in data:
            semestre.numero = data['numero']
        if 'anio' in data:
            semestre.anio = data['anio']
        if 'periodo' in data:
            semestre.periodo = data['periodo']
        if 'estudiante_id' in data:
            semestre.estudiante_id = data['estudiante_id']
            
        db.commit()
        
        return jsonify({
            'id': semestre.id,
            'numero': semestre.numero,
            'anio': semestre.anio,
            'periodo': semestre.periodo,
            'estudiante_id': semestre.estudiante_id
        })
    except Exception as e:
        db.rollback()
        return jsonify({'error': str(e)}), 500
    finally:
        db.close()

@semesterRoutes.route('/<int:id>', methods=['DELETE'])
def deleteSemester(id):
    db = SessionLocal()
    try:
        semestre = db.query(Semestre).filter(Semestre.id == id).first()
        if not semestre:
            return jsonify({'error': 'Semestre no encontrado'}), 404
            
        db.delete(semestre)
        db.commit()
        
        return jsonify({'message': 'Semestre eliminado correctamente'})
    except Exception as e:
        db.rollback()
        return jsonify({'error': str(e)}), 500
    finally:
        db.close()