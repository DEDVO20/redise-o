from flask import Blueprint, jsonify, request
from backend.models.materias import Materia
from backend.models.base import SessionLocal

subjectRoutes = Blueprint('subjectRoutes', __name__, url_prefix='/subjects')

@subjectRoutes.route('/', methods=['GET'])
def getSubjects():
    db = SessionLocal()
    try:
        materias = db.query(Materia).all()
        return jsonify([{
            'id': materia.id,
            'nombre': materia.nombre,
            'codigo': materia.codigo,
            'creditos': materia.creditos
        } for materia in materias])
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    finally:
        db.close()

@subjectRoutes.route('/<int:id>', methods=['GET'])
def getSubject(id):
    db = SessionLocal()
    try:
        materia = db.query(Materia).filter(Materia.id == id).first()
        if not materia:
            return jsonify({'error': 'Materia no encontrada'}), 404
        return jsonify({
            'id': materia.id,
            'nombre': materia.nombre,
            'codigo': materia.codigo,
            'creditos': materia.creditos
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    finally:
        db.close()

@subjectRoutes.route('/', methods=['POST'])
def createSubject():
    db = SessionLocal()
    try:
        data = request.get_json()
        if not data or 'nombre' not in data or 'codigo' not in data or 'creditos' not in data:
            return jsonify({'error': 'Se requieren nombre, código y créditos de la materia'}), 400
            
        nueva_materia = Materia(
            nombre=data['nombre'],
            codigo=data['codigo'],
            creditos=data['creditos']
        )
        db.add(nueva_materia)
        db.commit()
        db.refresh(nueva_materia)
        
        return jsonify({
            'id': nueva_materia.id,
            'nombre': nueva_materia.nombre,
            'codigo': nueva_materia.codigo,
            'creditos': nueva_materia.creditos
        }), 201
    except Exception as e:
        db.rollback()
        return jsonify({'error': str(e)}), 500
    finally:
        db.close()

@subjectRoutes.route('/<int:id>', methods=['PUT'])
def updateSubject(id):
    db = SessionLocal()
    try:
        materia = db.query(Materia).filter(Materia.id == id).first()
        if not materia:
            return jsonify({'error': 'Materia no encontrada'}), 404
            
        data = request.get_json()
        if 'nombre' in data:
            materia.nombre = data['nombre']
        if 'codigo' in data:
            materia.codigo = data['codigo']
        if 'creditos' in data:
            materia.creditos = data['creditos']
            
        db.commit()
        
        return jsonify({
            'id': materia.id,
            'nombre': materia.nombre,
            'codigo': materia.codigo,
            'creditos': materia.creditos
        })
    except Exception as e:
        db.rollback()
        return jsonify({'error': str(e)}), 500
    finally:
        db.close()

@subjectRoutes.route('/<int:id>', methods=['DELETE'])
def deleteSubject(id):
    db = SessionLocal()
    try:
        materia = db.query(Materia).filter(Materia.id == id).first()
        if not materia:
            return jsonify({'error': 'Materia no encontrada'}), 404
            
        db.delete(materia)
        db.commit()
        
        return jsonify({'message': 'Materia eliminada correctamente'})
    except Exception as e:
        db.rollback()
        return jsonify({'error': str(e)}), 500
    finally:
        db.close()