from flask import Flask, jsonify
from flask_cors import CORS
from backend.models.base import engine, Base
from backend.api import api

def create_app():
    app = Flask(__name__)
    CORS(app)

    #registrar rutas
    app.register_blueprint(api, url_prefix='/api')
    
    # Ruta de prueba
    @app.route('/api/test')
    def test():
        return jsonify({"message": "API funcionando correctamente"})

    #crear tablas si no existen
    Base.metadata.create_all(bind=engine)
    return app