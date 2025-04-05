
function Sidebar() {
  return (
    <nav className="sticky top-0 h-dvh rounded-lg drop-shadow-xl m-5 w-72 max-h-800 bg-[#F0A400] p-4 flex flex-col gap-8">
      <section className="border-t-2 border-black pt-4">
        <ul className="space-y-4">
          <li>
            <a href="#" className="block rounded-lg hover:bg-black/10 transition-colors duration-200 cursor-pointer">
              <div className="px-4 py-2">
                <span className="block w-full text-left font-bold">
                  Cartera
                </span>
                <p className="text-sm mt-1">
                  Revisa un historico de tus pagos
                </p>
              </div>
            </a>
          </li>
          <li>
            <a href="#" className="block rounded-lg hover:bg-black/10 transition-colors duration-200 cursor-pointer">
              <div className="px-4 py-2">
                <span className="block w-full text-left font-bold">
                  PSE
                </span>
                <p className="text-sm mt-1">
                  Realiza un pago pendiente
                </p>
              </div>
            </a>
          </li>
          <li>
            <a href="#" className="block rounded-lg hover:bg-black/10 transition-colors duration-200 cursor-pointer">
              <div className="px-4 py-2">
                <span className="block w-full text-left font-bold">
                  Tarjeta de identificación
                </span>
                <p className="text-sm mt-1">
                  Información de tu carneta de identidad
                </p>
              </div>
            </a>
          </li>
        </ul>
      </section>
      <section className="border-t-2 border-black pt-4">
        <ul className="space-y-4">
          <li>
            <a href="#" className="block rounded-lg hover:bg-black/10 transition-colors duration-200 cursor-pointer">
              <div className="px-4 py-2">
                <span className="block w-full text-left font-bold">
                  Notas
                </span>
                <p className="text-sm mt-1">
                  Historico de calificaciones
                </p>
              </div>
            </a>
          </li>
          <li>
            <a href="#" className="block rounded-lg hover:bg-black/10 transition-colors duration-200 cursor-pointer">
              <div className="px-4 py-2">
                <span className="block w-full text-left font-bold">
                  Ayuda
                </span>
                <p className="text-sm mt-1">
                  Centro de ayuda
                </p>
              </div>
            </a>
          </li>
        </ul>        
      </section>
    </nav>
  )
}

export default Sidebar