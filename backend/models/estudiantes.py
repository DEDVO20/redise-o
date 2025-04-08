from sqlalchemy import Column, Integer, String, ForeignKey, Text, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime
from .base import Base
import bcrypt

class Estudiante(Base):
    __tablename__ = 'Estudiantes'

    id = Column(Integer, primary_key=True)
    nombre = Column(String(100), nullable=False)
    documento = Column(String(20), unique=True, nullable=False) 
    correo = Column(String(100), unique=True)
    password = Column(String(255))
    foto_url = Column(Text)
    carrera_id = Column(Integer, ForeignKey('Carreras.id'))
    rol_id = Column(Integer, ForeignKey('Roles.id'))
    fecha_registro = Column(DateTime, default=datetime.utcnow)
    estado = Column(String(20), default='Activo')

    carrera = relationship('Carrera', back_populates='estudiantes')
    rol = relationship('Rol', back_populates='estudiantes')
    semestres = relationship('Semestre', back_populates='estudiante')
    pagos = relationship('Pago', back_populates='estudiante')
    matriculas = relationship('Matricula', back_populates='estudiante')

    def to_dict(self):
        return {
            'id': self.id,
            'nombre': self.nombre,
            'documento': self.documento,
            'correo': self.correo,
            'foto_url': self.foto_url,
            'carrera_id': self.carrera_id,
            'rol_id': self.rol_id,
            'fecha_registro': self.fecha_registro,
            'estado': self.estado
        }
        
    def set_password(self, password):
        # Generar hash de la contraseña
        password_bytes = password.encode('utf-8')
        salt = bcrypt.gensalt()
        hashed = bcrypt.hashpw(password_bytes, salt)
        self.password = hashed.decode('utf-8')
        
    def check_password(self, password):
        # Verificar si la contraseña coincide con el hash almacenado
        if not self.password:
            return False
        try:
            password_bytes = password.encode('utf-8')
            stored_hash_bytes = self.password.encode('utf-8')
            # Verificar si el formato del hash es correcto
            if not stored_hash_bytes.startswith(b'$2'):
                print(f"Error: El hash almacenado no tiene el formato correcto: {self.password[:10]}...")
                return False
            return bcrypt.checkpw(password_bytes, stored_hash_bytes)
        except Exception as e:
            print(f"Error detallado al verificar contraseña: {str(e)}, tipo: {type(e)}")
            print(f"Longitud de contraseña: {len(password)}, hash almacenado (primeros 10 caracteres): {self.password[:10] if self.password else 'None'}")
            # No relanzar la excepción, en su lugar retornar False
            return False
