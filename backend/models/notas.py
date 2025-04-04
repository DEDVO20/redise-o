from sqlalchemy import Column, Integer, ForeignKey, Numeric
from sqlalchemy.orm import relationship
from .base import Base

class Nota(Base):
    __tablename__ = 'Notas'

    id = Column(Integer, primary_key=True)
    matricula_id = Column(Integer, ForeignKey('Matriculas.id'))
    calificacion = Column(Numeric(4, 2))

    matricula = relationship('Matricula', back_populates='notas')
