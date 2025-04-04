from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker
from dotenv import load_dotenv
import os
import logging

# Configurar logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

load_dotenv() #cargar variables de entorno .env

DATABASE_URL = os.getenv('DATABASE_URL')
logger.info(f"Conectando a la base de datos con URL: {DATABASE_URL}")

try:
    engine = create_engine(DATABASE_URL)
    # Probar la conexión
    with engine.connect() as conn:
        logger.info("Conexión a la base de datos establecida correctamente")
except Exception as e:
    logger.error(f"Error al conectar a la base de datos: {str(e)}")
    raise

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()
