import os
import sys
from dotenv import load_dotenv

# Cargar variables de entorno
load_dotenv()

# Verificar la conexión a la base de datos
def test_connection():
    try:
        # Importar después de cargar variables de entorno
        import psycopg2
        from psycopg2 import OperationalError
        
        # Obtener URL de la base de datos
        db_url = os.getenv('DATABASE_URL')
        print(f"Intentando conectar a: {db_url}")
        
        # Intentar conexión
        conn = psycopg2.connect(db_url)
        print("Conexión exitosa a la base de datos")
        conn.close()
        return True
    except OperationalError as e:
        print(f"Error de conexión: {e}")
        return False
    except Exception as e:
        print(f"Error inesperado: {e}")
        return False

# Ejecutar la actualización de contraseñas si la conexión es exitosa
def run_update():
    if test_connection():
        try:
            from backend.scripts.update_passwords import update_student_passwords
            print("Iniciando actualización de contraseñas...")
            update_student_passwords()
            print("Actualización completada con éxito.")
        except Exception as e:
            print(f"Error durante la actualización: {e}")
    else:
        print("No se puede ejecutar la actualización debido a problemas de conexión.")

if __name__ == "__main__":
    run_update()