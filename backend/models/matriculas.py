from sqlalchemy import Column, Integer, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime
from .base import Base

class Matricula(Base):
    __tablename__ = 'Matriculas'

    id = Column(Integer, primary_key=True)
    estudiante_id = Column(Integer, ForeignKey('Estudiantes.id'))
    materia_id = Column(Integer, ForeignKey('Materias.id'))
    semestre_id = Column(Integer, ForeignKey('Semestres.id'))
    fecha_inscripcion = Column(DateTime, default=datetime.utcnow)

    estudiante = relationship('Estudiante', back_populates='matriculas')
    materia = relationship('Materia', back_populates='matriculas')
    semestre = relationship('Semestre')
    notas = relationship('Nota', back_populates='matricula')
