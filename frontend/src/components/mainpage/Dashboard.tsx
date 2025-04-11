import TaskItems from "./TaskItems"
import { useSlideAnimation } from "../../hooks/useSlideAnimation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { useAuth } from "@/lib/auth-context";
const taskOptions = [
  {title: "Historico de pagos", imageUrl: "#", buttonText: "Ver"},
  {title: "Imprimir carnet de identificicación", imageUrl: "#", buttonText: "Imprimir"},
  {title: "Realizar un pago", imageUrl: "#"},
  {title: "Contactar a un agente", imageUrl: "#", buttonText: "Contactar"},
  {title: "Materias pendientes", imageUrl: "#", buttonText: "Ver"},
  {title: "Revisión de pensum", imageUrl: "#", buttonText: "Ver"},
]

function Dashboard() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const careerSlide = useSlideAnimation({ direction: 'left', delay: 100 });
  const statsSlide = useSlideAnimation({ direction: 'right', delay: 200 });
  const { user } = useAuth();
  return (
    <section className='grid grid-cols-1 lg:grid-cols-4 gap-4 p-4 overflow-y-auto h-[calc(100vh-2rem)] max-h-screen'>
      {/* Panel de información del estudiante */}
      <div className="lg:col-span-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className={`${careerSlide.getSlideClass()}`}>
          <CardHeader>
            <CardTitle>Información del Estudiante</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">Carrera:</p>
            <h2 className='text-xl font-bold'>
              {user?.carrera?.nombre}
            </h2>
          </CardContent>
        </Card>

        <Card className={`${statsSlide.getSlideClass()}`}>
          <CardHeader>
            <CardTitle>Estado Académico</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between">
                <span>Semestre Actual:</span>
                <span className="font-bold">6to</span>
              </div>
              <div className="flex justify-between">
                <span>Créditos Aprobados:</span>
                <span className="font-bold">120/180</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className={`${statsSlide.getSlideClass()}`}>
          <CardHeader>
            <CardTitle>Estado Financiero</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between">
                <span>Pagos Pendientes:</span>
                <span className="font-bold text-red-500">2</span>
              </div>
              <div className="flex justify-between">
                <span>Próximo Vencimiento:</span>
                <span className="font-bold">15/03/2024</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Panel principal izquierdo */}
      <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Estadísticas Académicas */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Estadísticas Académicas</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <HoverCard>
              <HoverCardTrigger asChild>
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Progreso del Semestre</span>
                    <span className="text-sm text-muted-foreground">75%</span>
                  </div>
                  <Progress value={75} className="h-2" />
                </div>
              </HoverCardTrigger>
              <HoverCardContent>
                <div className="flex flex-col gap-2">
                  <p className="text-sm">Has completado el 75% del semestre actual</p>
                  <p className="text-xs text-muted-foreground">12 de 16 semanas completadas</p>
                </div>
              </HoverCardContent>
            </HoverCard>
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Promedio General</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">8.5</div>
                  <p className="text-xs text-muted-foreground">de 10 puntos</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Materias Aprobadas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">24/32</div>
                  <p className="text-xs text-muted-foreground">75% completado</p>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>

        {/* Tareas Recientes y Populares */}
        <Card>
          <CardHeader>
            <CardTitle>Últimas Tareas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <TaskItems {...taskOptions[0]} />
              <TaskItems {...taskOptions[1]} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tareas Populares</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <TaskItems {...taskOptions[2]} />
              <TaskItems {...taskOptions[3]} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Panel lateral derecho */}
      <div className="lg:col-span-1 space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Calendario Académico</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border w-full"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Notificaciones</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-full">
              <div className="flex items-center gap-2 p-2 bg-yellow-50 rounded-lg">
                <span className="text-yellow-600">⚠️</span>
                <p className="text-sm">Entrega pendiente en 2 días</p>
              </div>
              <div className="flex items-center gap-2 p-2 bg-blue-50 rounded-lg">
                <span className="text-blue-600">ℹ️</span>
                <p className="text-sm">Nueva calificación disponible</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

export default Dashboard