import { useState } from 'react'
import Header from '../mainpage/Header.tsx'
import Sidebar from '../mainpage/Sidebar.tsx'
import { Sheet, SheetContent} from "@/components/ui/sheet"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useSlideAnimation } from "@/hooks/useSlideAnimation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAuth } from "@/lib/auth-context"

function IdMainComponent() {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const { user } = useAuth()
    const cardSlide = useSlideAnimation({ direction: 'right', delay: 200 })
    
    return (
        <div className="min-h-screen bg-gray-50">
            <div>
                <Header setSidebarOpen={setSidebarOpen} />
            </div>
            
            {/* Versión móvil del sidebar usando Sheet */}
            <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
                <SheetContent side="left" className="p-0 bg-[#F0A400] border-r-0 w-[280px] sm:max-w-[280px] transition-transform duration-300 ease-in-out transform">
                    <Sidebar />
                </SheetContent>
            </Sheet>
            
            {/* Layout principal - responsive */}
            <main className='grid md:grid-cols-[350px_1fr] grid-cols-[1fr]'>
                <Sidebar className="hidden md:flex" />
                <div className="p-6">
                    <Card className={`max-w-3xl mx-auto ${cardSlide.getSlideClass()}`}>
                        <CardHeader>
                            <CardTitle>Carnet de Identificación</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-col md:flex-row items-center gap-8 p-6 bg-gradient-to-r from-[#0072C6] to-[#00A3FF] rounded-lg text-white">
                                <Avatar className="w-32 h-32 border-4 border-white">
                                    <AvatarImage src="https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg" />
                                    <AvatarFallback className="text-4xl">
                                        {user?.nombre ? user.nombre.charAt(0) + (user.apellido ? user.apellido.charAt(0) : '') : 'ES'}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="space-y-4 text-center md:text-left">
                                    <div>
                                        <h3 className="text-2xl font-bold">{user?.nombre} {user?.apellido}</h3>
                                        <p className="text-white/80">Estudiante</p>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-white/80">ID Estudiante</p>
                                            <p className="font-semibold">{user?.id || '12345'}</p>
                                        </div>
                                        <div>
                                            <p className="text-white/80">Carrera</p>
                                            <p className="font-semibold">Ingeniería de Software</p>
                                        </div>
                                        <div>
                                            <p className="text-white/80">Semestre</p>
                                            <p className="font-semibold">6to</p>
                                        </div>
                                        <div>
                                            <p className="text-white/80">Estado</p>
                                            <p className="font-semibold">Activo</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </main> 
        </div>
    )
}

export default IdMainComponent