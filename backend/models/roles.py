from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from .base import Base

class Rol(Base):
    __tablename__ = 'Roles'

    id = Column(Integer, primary_key=True)
    nombre = Column(String(50), nullable=False)

    estudiantes = relationship('Estudiante', back_populates='rol')
