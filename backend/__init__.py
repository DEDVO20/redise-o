from flask import Flask, jsonify
from flask_cors import CORS
from backend.models.base import engine, Base
from backend.api import api
from backend.api.auth import jwt

def create_app():
    app = Flask(__name__)
    app.config['JWT_SECRET_KEY'] = 'supersecret'
    CORS(app)

    jwt.init_app(app)
    #registrar rutas
    app.register_blueprint(api, url_prefix='/api')
    
    # Ruta de prueba
    @app.route('/api/test')
    def test():
        return jsonify({"message": "API funcionando correctamente"})

    #crear tablas si no existen
    Base.metadata.create_all(bind=engine)

    with app.app_context():
        print("Rutas registradas:")
        for rule in app.url_map.iter_rules():
            print(f"{rule}")

    return app