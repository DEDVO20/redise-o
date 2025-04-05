from sqlalchemy import Column, Integer, String, ForeignKey, Text, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime
from .base import Base

class Estudiante(Base):
    __tablename__ = 'Estudiantes'

    id = Column(Integer, primary_key=True)
    nombre = Column(String(100), nullable=False)
    documento = Column(String(20), unique=True, nullable=False) 
    correo = Column(String(100), unique=True)
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
