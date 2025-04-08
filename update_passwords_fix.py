import os
import sys
from dotenv import load_dotenv
import psycopg2
import bcrypt

# Cargar variables de entorno
load_dotenv()

def check_estudiantes_table():
    try:
        # Conectar a la base de datos
        conn = psycopg2.connect('postgresql://postgres:admin@localhost/universidad')
        cursor = conn.cursor()
        
        # Verificar si existe la tabla Estudiantes
        cursor.execute("SELECT EXISTS(SELECT 1 FROM information_schema.tables WHERE table_name = 'estudiantes')")
        table_exists = cursor.fetchone()[0]
        
        if not table_exists:
            print("La tabla Estudiantes no existe en la base de datos.")
            return False
            
        # Verificar si existe la columna password
        cursor.execute("SELECT EXISTS(SELECT 1 FROM information_schema.columns WHERE table_name = 'estudiantes' AND column_name = 'password')")
        password_column_exists = cursor.fetchone()[0]
        
        if not password_column_exists:
            print("La columna 'password' no existe en la tabla Estudiantes.")
            return False
            
        print("La tabla Estudiantes y la columna password existen correctamente.")
        return True
    except Exception as e:
        print(f"Error al verificar la tabla Estudiantes: {e}")
        return False
    finally:
        if 'conn' in locals():
            conn.close()

def update_student_passwords():
    try:
        # Verificar la tabla primero
        if not check_estudiantes_table():
            return False
            
        # Conectar a la base de datos
        conn = psycopg2.connect('postgresql://postgres:admin@localhost/universidad')
        cursor = conn.cursor()
        
        # Obtener todos los estudiantes
        cursor.execute("SELECT id, nombre, documento, password FROM estudiantes")
        estudiantes = cursor.fetchall()
        print(f"Encontrados {len(estudiantes)} estudiantes en la base de datos")
        
        # Contador de estudiantes actualizados
        updated_count = 0
        
        for estudiante in estudiantes:
            id, nombre, documento, password = estudiante
            
            # Verificar si el estudiante no tiene contraseña
            if not password:
                # Crear una contraseña temporal basada en su documento
                temp_password = f"{documento}123"
                
                # Generar hash de la contraseña
                password_bytes = temp_password.encode('utf-8')
                salt = bcrypt.gensalt()
                hashed = bcrypt.hashpw(password_bytes, salt)
                hashed_password = hashed.decode('utf-8')
                
                # Actualizar la contraseña en la base de datos
                cursor.execute("UPDATE estudiantes SET password = %s WHERE id = %s", (hashed_password, id))
                updated_count += 1
                print(f"Actualizada contraseña para estudiante {nombre} (ID: {id})")
        
        # Guardar cambios si se actualizaron estudiantes
        if updated_count > 0:
            conn.commit()
            print(f"Se actualizaron contraseñas para {updated_count} estudiantes")
        else:
            print("Todos los estudiantes ya tienen contraseñas configuradas")
            
        return True
    except Exception as e:
        if 'conn' in locals():
            conn.rollback()
        print(f"Error al actualizar contraseñas: {e}")
        return False
    finally:
        if 'conn' in locals():
            conn.close()

if __name__ == "__main__":
    print("Iniciando verificación y actualización de contraseñas...")
    update_student_passwords()
    print("Proceso completado.")