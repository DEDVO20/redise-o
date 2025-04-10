import os
import sys
from dotenv import load_dotenv
import psycopg2

# Cargar variables de entorno
load_dotenv()

def add_password_column():
    try:
        # Conectar a la base de datos
        conn = psycopg2.connect('postgresql://postgres:admin@localhost/universidad')
        conn.autocommit = True  # Para que los cambios de DDL se apliquen inmediatamente
        cursor = conn.cursor()
        
        # Verificar si la columna password ya existe
        cursor.execute("""SELECT column_name 
                        FROM information_schema.columns 
                        WHERE table_name = 'Estudiantes' 
                        AND column_name = 'password'""")
        column_exists = cursor.fetchone()
        
        if column_exists:
            print("La columna 'password' ya existe en la tabla Estudiantes.")
            return True
            
        # Añadir la columna password a la tabla Estudiantes
        print("Añadiendo columna 'password' a la tabla Estudiantes...")
        cursor.execute("ALTER TABLE \"Estudiantes\" ADD COLUMN password VARCHAR(255)")
        
        print("Columna 'password' añadida correctamente.")
        return True
    except Exception as e:
        print(f"Error al añadir la columna password: {e}")
        return False
    finally:
        if 'conn' in locals():
            conn.close()

if __name__ == "__main__":
    print("Iniciando proceso para añadir columna de contraseña...")
    add_password_column()
    print("Proceso completado.")