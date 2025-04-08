from backend.scripts.update_passwords import update_student_passwords

if __name__ == "__main__":
    print("Iniciando actualización de contraseñas en la base de datos...")
    update_student_passwords()
    print("Proceso completado.")