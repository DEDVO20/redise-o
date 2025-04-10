import TaskItems from "./TaskItems"
const taskOptions = [
  {title: "Historico de pagos", imageUrl: "#", buttonText: "Ver"},
  {title: "Imprimir carnet de identificicación", imageUrl: "#", buttonText: "Imprimir"},
  {title: "Realizar un pago", imageUrl: "#"},
  {title: "Contactar a un agente", imageUrl: "#", buttonText: "Contactar"},
  {title: "Materias pendientes", imageUrl: "#", buttonText: "Ver"},
  {title: "Revisión de pensum", imageUrl: "#", buttonText: "Ver"},

 ]
function Dashboard() {
  return (
    <>
      <section className='grid grid-cols-2 grid-rows-[130px_minmax(400px,_auto)] gap-7 m-5 h-[calc(100vh-2.5rem)]'>
        <div className="shadow-xl flex flex-col items-start justify-evenly p-5 bg-white rounded-lg">
          <p className="text-gray-600">Su carrera es: </p>
          <h2 className='text-2xl md:text-lg lg:text-2xl bg-white font-bold'>
            Ingeniería de Software
          </h2>
        </div>
        <div className="shadow-xl bg-white rounded-lg p-6"></div>
        <div className="col-span-2 w-full flex flex-row flex-wrap xl:flex-nowrap shadow-xl bg-white rounded-lg p-12">
          <div className="w-300 flex flex-col items-start justify-center gap-5">
            <h2 className='text-xl sm:text-2xl md:text-2xl lg:text-5xl bg-white font-bold' >
              Bienvenido a el <span className="text-[#0072C6]">Portal de Notas</span>
            </h2>
            <p className="text-gray-600">
              Aquí podrás encontrar todo lo que necesitas para tu carrera. En esta sección puede seleccionar
              cualquier tarea que necesite realizar
              con rápidez
            </p>
          </div>
          <div className="w-full flex flex-col items-start justify-start gap-8 p-6">
            <div className="w-full">
              <h2 className="text-2xl font-bold mb-2">Últimas tareas realizadas</h2>
              <div className="border-l-2 border-gray-200 mb-4"></div>
              <div className="space-y-4">
                <TaskItems {...taskOptions[Math.floor(Math.random() * taskOptions.length)]}/>
                <TaskItems {...taskOptions[Math.floor(Math.random() * taskOptions.length)]}/>
              </div>
            </div>
            <div className="w-full">
              <h2 className="text-2xl font-bold mb-2">Tareas populares</h2>
              <div className="border-b-2 border-gray-200 mb-4"></div>
              <div className="space-y-4">
                <TaskItems {...taskOptions[Math.floor(Math.random() * taskOptions.length)]}/>
                <TaskItems {...taskOptions[Math.floor(Math.random() * taskOptions.length)]}/>
                <TaskItems {...taskOptions[Math.floor(Math.random() * taskOptions.length)]}/>
                
              </div>
            </div>
          </div>


        </div>
      </section>
    </>
  )
}

export default Dashboard