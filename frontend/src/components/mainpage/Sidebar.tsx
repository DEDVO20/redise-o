
import { useAuth } from "@/lib/auth-context";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

function Sidebar({ className }: { className?: string }) {
  const { user } = useAuth();
  const isAdmin = user?.rol_id === 1;
  
  return (
    <nav className={cn(
      "h-[calc(100vh-2.5rem)] rounded-lg drop-shadow-xl bg-[#F0A400] p-4 flex flex-col gap-8 overflow-y-auto",
      "md:sticky md:top-5 md:m-5 md:w-72",
      className
    )}>
      {/* Sección solo visible para administradores */}
      {isAdmin && (
        <section className="border-b-2 border-black pb-4">
          <h3 className="font-bold mb-2 px-4">Administración</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/register" className="block rounded-lg hover:bg-black/10 transition-colors duration-200 cursor-pointer">
                <div className="px-4 py-2">
                  <span className="block w-full text-left font-bold">
                    Registrar Estudiante
                  </span>
                  <p className="text-sm mt-1">
                    Crear una nueva cuenta de estudiante
                  </p>
                </div>
              </Link>
            </li>
          </ul>
        </section>
      )}
      
      <section className="border-t-2 border-black pt-4">
        <ul className="space-y-4">
        <li>
            <Link to="/dashboard" className="block rounded-lg hover:bg-black/10 transition-colors duration-200 cursor-pointer">
              <div className="px-4 py-2">
                <span className="block w-full text-left font-bold">
                  Dashboard
                </span>
                <p className="text-sm mt-1">
                  Página principal
                </p>
              </div>
            </Link>
          </li>
          <li>
            <Link to="/cartera" className="block rounded-lg hover:bg-black/10 transition-colors duration-200 cursor-pointer">
              <div className="px-4 py-2">
                <span className="block w-full text-left font-bold">
                  Cartera
                </span>
                <p className="text-sm mt-1">
                  Revisa un historico de tus pagos
                </p>
              </div>
            </Link>
          </li>
          <li>
            <Link to="/pse" className="block rounded-lg hover:bg-black/10 transition-colors duration-200 cursor-pointer">
              <div className="px-4 py-2">
                <span className="block w-full text-left font-bold">
                  PSE
                </span>
                <p className="text-sm mt-1">
                  Realiza un pago pendiente
                </p>
              </div>
            </Link>
          </li>
          <li>
            <Link to="/idpage" className="block rounded-lg hover:bg-black/10 transition-colors duration-200 cursor-pointer">
              <div className="px-4 py-2">
                <span className="block w-full text-left font-bold">
                  Tarjeta de identificación
                </span>
                <p className="text-sm mt-1">
                  Información de tu carneta de identidad
                </p>
              </div>
            </Link>
          </li>
        </ul>
      </section>
      <section className="border-t-2 border-black pt-4">
        <ul className="space-y-4">
          <li>
            <Link to="/notas" className="block rounded-lg hover:bg-black/10 transition-colors duration-200 cursor-pointer">
              <div className="px-4 py-2">
                <span className="block w-full text-left font-bold">
                  Notas
                </span>
                <p className="text-sm mt-1">
                  Historico de calificaciones
                </p>
              </div>
            </Link>
          </li>
          <li>
            <Link to="/test-connection" className="block rounded-lg hover:bg-black/10 transition-colors duration-200 cursor-pointer">
              <div className="px-4 py-2">
                <span className="block w-full text-left font-bold">
                  Probar Conexión
                </span>
                <p className="text-sm mt-1">
                  Verificar conexión con el servidor
                </p>
              </div>
            </Link>
          </li>
          <li>
            <Link to="/ayuda" className="block rounded-lg hover:bg-black/10 transition-colors duration-200 cursor-pointer">
              <div className="px-4 py-2">
                <span className="block w-full text-left font-bold">
                  Ayuda
                </span>
                <p className="text-sm mt-1">
                  Centro de ayuda
                </p>
              </div>
            </Link>
          </li>
        </ul>        
      </section>
    </nav>
  )
}

export default Sidebar