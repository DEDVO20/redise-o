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
                        <CardHeader className="pb-0">
                            <CardTitle className="text-center text-xl">Carnet de Identificación</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-col p-6 bg-[#F5F5F5] rounded-lg overflow-hidden">
                                {/* Logo y título de la universidad */}
                                <div className="text-center mb-4">
                                    <h2 className="text-[#002856] text-3xl font-bold mb-0">Universitaria</h2>
                                    <h2 className="text-[#002856] text-3xl font-bold">de Colombia</h2>
                                </div>
                                
                                {/* Foto del estudiante */}
                                <div className="flex justify-center mb-2">
                                    <Avatar className="w-32 h-32 border-2 border-gray-300">
                                        <AvatarImage src="https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg" />
                                        <AvatarFallback className="text-4xl">
                                            {user?.nombre ? user.nombre.charAt(0)  : 'ES'}
                                        </AvatarFallback>
                                    </Avatar>
                                </div>
                                
                                {/* Banner ESTUDIANTE */}
                                <div className="bg-[#002856] text-white text-center py-2 mb-4">
                                    <h3 className="text-2xl font-bold">{user?.rol?.nombre}</h3>
                                </div>
                                
                                {/* Nombre del estudiante en mayúsculas */}
                                <div className="text-center mb-4">
                                    <h3 className="text-[#002856] text-xl font-bold">
                                        {user?.apellido ? user.apellido.toUpperCase() : ''} {user?.nombre ? user.nombre.toUpperCase() : ''}
                                    </h3>
                                    {/* <h4 className="text-[#002856] font-bold">
                                        {user?.nombre ? user.nombre.toUpperCase() : ''} {user?.apellido ? user.apellido.toUpperCase() : ''}
                                    </h4> */}
                                </div>
                                
                                {/* Información del estudiante y QR code */}
                                <div className="flex flex-col md:flex-row gap-4">
                                    <div className="flex-1 space-y-2">
                                        <div>
                                            <p className="font-bold text-[#002856] mb-0">CÓDIGO:</p>
                                            <p className="font-semibold">{user?.documento ? `ES${user.documento.padStart(12, '0')}` : 'ES000000000000'}</p>
                                        </div>
                                        <div>
                                            <p className="font-bold text-[#002856] mb-0">CÉDULA:</p>
                                            <p className="font-semibold">{user?.documento || '1191221728'}
                                                {console.log(user)}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="font-bold text-[#002856] mb-0">EMAIL:</p>
                                            <p className="font-semibold">{user?.correo || 'Usuario@gmail.com'}</p>
                                        </div>
                                        <div>
                                            <p className="font-bold text-[#002856] mb-0">VIGENTE:</p>
                                            <p className="font-semibold">31/12/2025</p>
                                        </div>
                                    </div>
                                    
                                    {/* QR Code */}
                                    <div className="flex-1 flex justify-center items-center">
                                        <img src="/assets/qr-code-sample.svg" alt="QR Code" className="w-32 h-32" />
                                    </div>
                                </div>
                                
                                {/* Franja de colores de la bandera colombiana */}
                                <div className="mt-4">
                                    <img src="/assets/colombia-flag-stripes.svg" alt="Bandera de Colombia" className="w-full h-6" />
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