import psycopg2

def check_database_tables():
    try:
        # Conectar a la base de datos
        conn = psycopg2.connect('postgresql://postgres:admin@localhost/universidad')
        cursor = conn.cursor()
        
        # Verificar tablas existentes
        cursor.execute("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'")
        tables = cursor.fetchall()
        
        print('Tablas en la base de datos:')
        for table in tables:
            print(f"- {table[0]}")
            
        # Si existe la tabla Estudiantes, verificar su estructura
        if any(table[0].lower() == 'estudiantes' for table in tables):
            print("\nEstructura de la tabla Estudiantes:")
            cursor.execute("SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'estudiantes'")
            columns = cursor.fetchall()
            for col in columns:
                print(f"- {col[0]}: {col[1]}")
        else:
            print("\nLa tabla Estudiantes no existe en la base de datos.")
            
        conn.close()
        return True
    except Exception as e:
        print(f"Error al verificar la base de datos: {e}")
        return False

if __name__ == "__main__":
    check_database_tables()