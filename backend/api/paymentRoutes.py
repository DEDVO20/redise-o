from flask import Blueprint, jsonify, request
from backend.models.pagos import Pago
from backend.models.base import SessionLocal
from datetime import datetime

paymentRoutes = Blueprint('paymentRoutes', __name__, url_prefix='/payments')

@paymentRoutes.route('/', methods=['GET'])
def getPayments():
    db = SessionLocal()
    try:
        pagos = db.query(Pago).all()
        return jsonify([{
            'id': pago.id,
            'estudiante_id': pago.estudiante_id,
            'concepto': pago.concepto,
            'valor': float(pago.valor) if pago.valor is not None else None,
            'fecha_pago': pago.fecha_pago.isoformat() if pago.fecha_pago else None,
            'estado': pago.estado
        } for pago in pagos])
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    finally:
        db.close()

@paymentRoutes.route('/<int:id>', methods=['GET'])
def getPayment(id):
    db = SessionLocal()
    try:
        pago = db.query(Pago).filter(Pago.id == id).first()
        if not pago:
            return jsonify({'error': 'Pago no encontrado'}), 404
        return jsonify({
            'id': pago.id,
            'estudiante_id': pago.estudiante_id,
            'concepto': pago.concepto,
            'valor': float(pago.valor) if pago.valor is not None else None,
            'fecha_pago': pago.fecha_pago.isoformat() if pago.fecha_pago else None,
            'estado': pago.estado
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    finally:
        db.close()

@paymentRoutes.route('/student/<int:estudiante_id>', methods=['GET'])
def getStudentPayments(estudiante_id):
    db = SessionLocal()
    try:
        pagos = db.query(Pago).filter(Pago.estudiante_id == estudiante_id).all()
        return jsonify([{
            'id': pago.id,
            'estudiante_id': pago.estudiante_id,
            'concepto': pago.concepto,
            'valor': float(pago.valor) if pago.valor is not None else None,
            'fecha_pago': pago.fecha_pago.isoformat() if pago.fecha_pago else None,
            'estado': pago.estado
        } for pago in pagos])
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    finally:
        db.close()

@paymentRoutes.route('/', methods=['POST'])
def createPayment():
    db = SessionLocal()
    try:
        data = request.get_json()
        if not data:
            return jsonify({'error': 'No se proporcionaron datos para el pago'}), 400

        # Validación de campos requeridos
        required_fields = ['estudiante_id', 'concepto', 'valor']
        missing_fields = [field for field in required_fields if field not in data]
        if missing_fields:
            return jsonify({'error': f'Faltan campos requeridos: {", ".join(missing_fields)}'}), 400

        # Validación de tipos de datos y valores
        if not isinstance(data['estudiante_id'], int):
            return jsonify({'error': 'El ID del estudiante debe ser un número entero'}), 400
        if not isinstance(data['concepto'], str) or len(data['concepto']) > 100:
            return jsonify({'error': 'El concepto debe ser un texto de máximo 100 caracteres'}), 400
        try:
            valor = float(data['valor'])
            if valor <= 0:
                return jsonify({'error': 'El valor del pago debe ser mayor que 0'}), 400
        except (ValueError, TypeError):
            return jsonify({'error': 'El valor del pago debe ser un número válido'}), 400

        # Validación de fecha
        try:
            fecha_pago = datetime.strptime(data.get('fecha_pago', datetime.now().strftime('%Y-%m-%d')), '%Y-%m-%d').date()
        except ValueError:
            return jsonify({'error': 'Formato de fecha inválido. Use YYYY-MM-DD'}), 400

        # Validación de estado
        estados_validos = ['Pagado', 'Pendiente', 'Cancelado']
        estado = data.get('estado', 'Pagado')
        if estado not in estados_validos:
            return jsonify({'error': f'Estado inválido. Valores permitidos: {", ".join(estados_validos)}'}), 400
            
        nuevo_pago = Pago(
            estudiante_id=data['estudiante_id'],
            concepto=data['concepto'],
            valor=data['valor'],
            fecha_pago=fecha_pago,
            estado=estado
        )
        db.add(nuevo_pago)
        db.commit()
        db.refresh(nuevo_pago)
        
        return jsonify({
            'id': nuevo_pago.id,
            'estudiante_id': nuevo_pago.estudiante_id,
            'concepto': nuevo_pago.concepto,
            'valor': float(nuevo_pago.valor) if nuevo_pago.valor is not None else None,
            'fecha_pago': nuevo_pago.fecha_pago.isoformat() if nuevo_pago.fecha_pago else None,
            'estado': nuevo_pago.estado
        }), 201
    except Exception as e:
        db.rollback()
        return jsonify({'error': str(e)}), 500
    finally:
        db.close()

@paymentRoutes.route('/<int:id>', methods=['PUT'])
def updatePayment(id):
    db = SessionLocal()
    try:
        pago = db.query(Pago).filter(Pago.id == id).first()
        if not pago:
            return jsonify({'error': 'Pago no encontrado'}), 404

        data = request.get_json()
        if not data:
            return jsonify({'error': 'No se proporcionaron datos para actualizar'}), 400

        # Validación de estudiante_id
        if 'estudiante_id' in data:
            if not isinstance(data['estudiante_id'], int):
                return jsonify({'error': 'El ID del estudiante debe ser un número entero'}), 400
            pago.estudiante_id = data['estudiante_id']

        # Validación de concepto
        if 'concepto' in data:
            if not isinstance(data['concepto'], str) or len(data['concepto']) > 100:
                return jsonify({'error': 'El concepto debe ser un texto de máximo 100 caracteres'}), 400
            pago.concepto = data['concepto']

        # Validación de valor
        if 'valor' in data:
            try:
                valor = float(data['valor'])
                if valor <= 0:
                    return jsonify({'error': 'El valor del pago debe ser mayor que 0'}), 400
                pago.valor = valor
            except (ValueError, TypeError):
                return jsonify({'error': 'El valor del pago debe ser un número válido'}), 400

        # Validación de fecha
        if 'fecha_pago' in data:
            try:
                pago.fecha_pago = datetime.strptime(data['fecha_pago'], '%Y-%m-%d').date()
            except ValueError:
                return jsonify({'error': 'Formato de fecha inválido. Use YYYY-MM-DD'}), 400

        # Validación de estado
        if 'estado' in data:
            estados_validos = ['Pagado', 'Pendiente', 'Cancelado']
            if data['estado'] not in estados_validos:
                return jsonify({'error': f'Estado inválido. Valores permitidos: {", ".join(estados_validos)}'}), 400
            pago.estado = data['estado']
            
        db.commit()
        
        return jsonify({
            'id': pago.id,
            'estudiante_id': pago.estudiante_id,
            'concepto': pago.concepto,
            'valor': float(pago.valor) if pago.valor is not None else None,
            'fecha_pago': pago.fecha_pago.isoformat() if pago.fecha_pago else None,
            'estado': pago.estado
        })
    except Exception as e:
        db.rollback()
        return jsonify({'error': str(e)}), 500
    finally:
        db.close()

@paymentRoutes.route('/<int:id>', methods=['DELETE'])
def deletePayment(id):
    db = SessionLocal()
    try:
        pago = db.query(Pago).filter(Pago.id == id).first()
        if not pago:
            return jsonify({'error': 'Pago no encontrado'}), 404
            
        db.delete(pago)
        db.commit()
        
        return jsonify({'message': 'Pago eliminado correctamente'})
    except Exception as e:
        db.rollback()
        return jsonify({'error': str(e)}), 500
    finally:
        db.close()