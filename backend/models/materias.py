from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from .base import Base

class Materia(Base):
    __tablename__ = 'Materias'

    id = Column(Integer, primary_key=True)
    nombre = Column(String(100), nullable=False)
    codigo = Column(String(20), unique=True, nullable=False)
    creditos = Column(Integer, nullable=False)

    matriculas = relationship('Matricula', back_populates='materia')
