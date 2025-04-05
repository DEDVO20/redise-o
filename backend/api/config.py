from datetime import timedelta
from flask_cors import CORS
from flask_jwt_extended import JWTManager

def configure_app(app):
    # Configuración de CORS
    CORS(app, resources={
        r"/api/*": {
            "origins": ["http://localhost:5173"],  # Frontend Vite default port
            "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
            "allow_headers": ["Content-Type", "Authorization"]
        }
    })

    # Configuración de JWT
    app.config['JWT_SECRET_KEY'] = 'tu-clave-secreta-aqui'  # Cambiar en producción
    app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(days=1)
    jwt = JWTManager(app)

    return app