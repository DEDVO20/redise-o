from flask import Blueprint, jsonify, request
from backend.models.roles import Rol
from backend.models.base import SessionLocal

roleRoutes = Blueprint('roleRoutes', __name__, url_prefix='/roles')

@roleRoutes.route('/', methods=['GET'])
def getRoles():
    db = SessionLocal()
    try:
        roles = db.query(Rol).all()
        return jsonify([{
            'id': rol.id,
            'nombre': rol.nombre
        } for rol in roles])
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    finally:
        db.close()

@roleRoutes.route('/<int:id>', methods=['GET'])
def getRole(id):
    db = SessionLocal()
    try:
        rol = db.query(Rol).filter(Rol.id == id).first()
        if not rol:
            return jsonify({'error': 'Rol no encontrado'}), 404
        return jsonify({
            'id': rol.id,
            'nombre': rol.nombre
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    finally:
        db.close()

@roleRoutes.route('/', methods=['POST'])
def createRole():
    db = SessionLocal()
    try:
        data = request.get_json()
        if not data or 'nombre' not in data:
            return jsonify({'error': 'Se requiere el nombre del rol'}), 400
            
        nuevo_rol = Rol(nombre=data['nombre'])
        db.add(nuevo_rol)
        db.commit()
        db.refresh(nuevo_rol)
        
        return jsonify({
            'id': nuevo_rol.id,
            'nombre': nuevo_rol.nombre
        }), 201
    except Exception as e:
        db.rollback()
        return jsonify({'error': str(e)}), 500
    finally:
        db.close()

@roleRoutes.route('/<int:id>', methods=['PUT'])
def updateRole(id):
    db = SessionLocal()
    try:
        rol = db.query(Rol).filter(Rol.id == id).first()
        if not rol:
            return jsonify({'error': 'Rol no encontrado'}), 404
            
        data = request.get_json()
        if not data or 'nombre' not in data:
            return jsonify({'error': 'Se requiere el nombre del rol'}), 400
            
        rol.nombre = data['nombre']
        db.commit()
        
        return jsonify({
            'id': rol.id,
            'nombre': rol.nombre
        })
    except Exception as e:
        db.rollback()
        return jsonify({'error': str(e)}), 500
    finally:
        db.close()

@roleRoutes.route('/<int:id>', methods=['DELETE'])
def deleteRole(id):
    db = SessionLocal()
    try:
        rol = db.query(Rol).filter(Rol.id == id).first()
        if not rol:
            return jsonify({'error': 'Rol no encontrado'}), 404
            
        db.delete(rol)
        db.commit()
        
        return jsonify({'message': 'Rol eliminado correctamente'})
    except Exception as e:
        db.rollback()
        return jsonify({'error': str(e)}), 500
    finally:
        db.close()