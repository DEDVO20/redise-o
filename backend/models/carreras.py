from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from .base import Base

class Carrera(Base):
    __tablename__ = 'Carreras'

    id = Column(Integer, primary_key=True)
    nombre = Column(String(100), nullable=False)

    estudiantes = relationship('Estudiante', back_populates='carrera')
