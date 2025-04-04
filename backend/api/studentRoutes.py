from flask import Blueprint, jsonify

studentRoutes = Blueprint('studentRoutes', __name__)

@studentRoutes.route('/api/students', methods=['GET'])
def getStudents():
    return jsonify({'message': 'API funcionando correctamente'})
