from backend.models.base import SessionLocal, engine, Base
from backend.models.estudiantes import Estudiante
import logging

# Configurar logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def update_student_passwords():
    """
    Script para actualizar las contraseñas de estudiantes existentes que no tienen contraseña configurada.
    Asigna una contraseña temporal basada en su número de documento.
    """
    db = SessionLocal()
    try:
        # Obtener todos los estudiantes
        estudiantes = db.query(Estudiante).all()
        logger.info(f"Encontrados {len(estudiantes)} estudiantes en la base de datos")
        
        # Contador de estudiantes actualizados
        updated_count = 0
        
        for estudiante in estudiantes:
            # Verificar si el estudiante no tiene contraseña
            if not estudiante.password:
                # Crear una contraseña temporal basada en su documento
                temp_password = f"{estudiante.documento}123"
                estudiante.set_password(temp_password)
                updated_count += 1
                logger.info(f"Actualizada contraseña para estudiante {estudiante.nombre} (ID: {estudiante.id})")
        
        # Guardar cambios si se actualizaron estudiantes
        if updated_count > 0:
            db.commit()
            logger.info(f"Se actualizaron contraseñas para {updated_count} estudiantes")
        else:
            logger.info("Todos los estudiantes ya tienen contraseñas configuradas")
            
    except Exception as e:
        db.rollback()
        logger.error(f"Error al actualizar contraseñas: {str(e)}")
    finally:
        db.close()

if __name__ == "__main__":
    update_student_passwords()