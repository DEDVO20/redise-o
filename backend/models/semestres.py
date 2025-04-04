from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from .base import Base

class Semestre(Base):
    __tablename__ = 'Semestres'

    id = Column(Integer, primary_key=True)
    numero = Column(Integer, nullable=False)
    anio = Column(Integer, nullable=False)
    periodo = Column(String(10), nullable=False)
    estudiante_id = Column(Integer, ForeignKey('Estudiantes.id'))

    estudiante = relationship('Estudiante', back_populates='semestres')
