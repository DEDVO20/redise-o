from flask import Blueprint, jsonify, render_template

main = Blueprint('main', __name__)

@main.route('/api/test', methods=['GET'])
def test():
    return jsonify({'message': 'API funcionando correctamente'})

@main.route('/carnet/<int:studentId>')
def showCarnet(studentId):
    student = {"id": studentId, "name": "John Doe", "role": "student", "career": "Computer Science"}
    return render_template('carnet.html', student=student)


