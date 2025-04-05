from flask import Blueprint, jsonify, request
from backend.models.carreras import Carrera
from backend.models.base import SessionLocal

careerRoutes = Blueprint('careerRoutes', __name__, url_prefix='/careers')

@careerRoutes.route('/', methods=['GET'])
def getCareers():
    db = SessionLocal()
    try:
        carreras = db.query(Carrera).all()
        return jsonify([{
            'id': carrera.id,
            'nombre': carrera.nombre
        } for carrera in carreras])
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    finally:
        db.close()

@careerRoutes.route('/<int:id>', methods=['GET'])
def getCareer(id):
    db = SessionLocal()
    try:
        carrera = db.query(Carrera).filter(Carrera.id == id).first()
        if not carrera:
            return jsonify({'error': 'Carrera no encontrada'}), 404
        return jsonify({
            'id': carrera.id,
            'nombre': carrera.nombre
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    finally:
        db.close()

@careerRoutes.route('/', methods=['POST'])
def createCareer():
    db = SessionLocal()
    try:
        data = request.get_json()
        if not data or 'nombre' not in data:
            return jsonify({'error': 'Se requiere el nombre de la carrera'}), 400
            
        nueva_carrera = Carrera(nombre=data['nombre'])
        db.add(nueva_carrera)
        db.commit()
        db.refresh(nueva_carrera)
        
        return jsonify({
            'id': nueva_carrera.id,
            'nombre': nueva_carrera.nombre
        }), 201
    except Exception as e:
        db.rollback()
        return jsonify({'error': str(e)}), 500
    finally:
        db.close()

@careerRoutes.route('/<int:id>', methods=['PUT'])
def updateCareer(id):
    db = SessionLocal()
    try:
        carrera = db.query(Carrera).filter(Carrera.id == id).first()
        if not carrera:
            return jsonify({'error': 'Carrera no encontrada'}), 404
            
        data = request.get_json()
        if not data or 'nombre' not in data:
            return jsonify({'error': 'Se requiere el nombre de la carrera'}), 400
            
        carrera.nombre = data['nombre']
        db.commit()
        
        return jsonify({
            'id': carrera.id,
            'nombre': carrera.nombre
        })
    except Exception as e:
        db.rollback()
        return jsonify({'error': str(e)}), 500
    finally:
        db.close()

@careerRoutes.route('/<int:id>', methods=['DELETE'])
def deleteCareer(id):
    db = SessionLocal()
    try:
        carrera = db.query(Carrera).filter(Carrera.id == id).first()
        if not carrera:
            return jsonify({'error': 'Carrera no encontrada'}), 404
            
        db.delete(carrera)
        db.commit()
        
        return jsonify({'message': 'Carrera eliminada correctamente'})
    except Exception as e:
        db.rollback()
        return jsonify({'error': str(e)}), 500
    finally:
        db.close()