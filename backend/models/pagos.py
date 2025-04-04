from sqlalchemy import Column, Integer, String, ForeignKey, Date, Numeric
from sqlalchemy.orm import relationship
from .base import Base

class Pago(Base):
    __tablename__ = 'Pagos'

    id = Column(Integer, primary_key=True)
    estudiante_id = Column(Integer, ForeignKey('Estudiantes.id'))
    concepto = Column(String(100), nullable=False)
    valor = Column(Numeric(10, 2), nullable=False)
    fecha_pago = Column(Date, nullable=False)
    estado = Column(String(20))

    estudiante = relationship('Estudiante', back_populates='pagos')
