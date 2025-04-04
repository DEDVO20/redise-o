from flask import Blueprint, jsonify

main = Blueprint('main', __name__)

@main.route('/api/test', methods=['GET'])
def test():
    return jsonify({'message': 'API funcionando correctamente'})