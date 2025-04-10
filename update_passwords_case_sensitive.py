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
        
        # Obtener el nombre exacto de la tabla (respetando mayúsculas/minúsculas)
        cursor.execute("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'")
        tables = cursor.fetchall()
        table_names = [table[0] for table in tables]
        print(f"Tablas disponibles: {table_names}")
        
        # Buscar la tabla Estudiantes (puede estar como 'Estudiantes', 'estudiantes', etc.)
        estudiantes_table = None
        for table in table_names:
            if table.lower() == 'estudiantes':
                estudiantes_table = table
                break
                
        if not estudiantes_table:
            print("No se encontró la tabla de estudiantes en la base de datos.")
            return False, None
            
        print(f"Tabla de estudiantes encontrada: '{estudiantes_table}'")
        
        # Verificar columnas de la tabla
        cursor.execute(f"SELECT column_name FROM information_schema.columns WHERE table_name = '{estudiantes_table}'")
        columns = cursor.fetchall()
        column_names = [col[0] for col in columns]
        print(f"Columnas disponibles: {column_names}")
        
        # Buscar la columna password (puede estar como 'password', 'Password', etc.)
        password_column = None
        for col in column_names:
            if col.lower() == 'password':
                password_column = col
                break
                
        if not password_column:
            print("No se encontró la columna de contraseña en la tabla de estudiantes.")
            return False, None
            
        print(f"Columna de contraseña encontrada: '{password_column}'")
        return True, (estudiantes_table, password_column)
    except Exception as e:
        print(f"Error al verificar la tabla de estudiantes: {e}")
        return False, None
    finally:
        if 'conn' in locals():
            conn.close()

def update_student_passwords():
    try:
        # Verificar la tabla primero
        success, table_info = check_estudiantes_table()
        if not success or not table_info:
            return False
            
        estudiantes_table, password_column = table_info
        
        # Conectar a la base de datos
        conn = psycopg2.connect('postgresql://postgres:admin@localhost/universidad')
        cursor = conn.cursor()
        
        # Obtener todos los estudiantes
        cursor.execute(f"SELECT id, nombre, documento, \"{password_column}\" FROM \"{estudiantes_table}\"")
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
                cursor.execute(f"UPDATE \"{estudiantes_table}\" SET \"{password_column}\" = %s WHERE id = %s", 
                               (hashed_password, id))
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