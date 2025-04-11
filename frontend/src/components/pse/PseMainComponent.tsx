import { useState } from 'react'
import Header from '../mainpage/Header.tsx'
import Sidebar from '../mainpage/Sidebar.tsx'
import { Sheet, SheetContent} from "@/components/ui/sheet"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useSlideAnimation } from "@/hooks/useSlideAnimation"

function PseMainComponent() {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const headerSlide = useSlideAnimation({ direction: 'down', delay: 100 })
    const formSlide = useSlideAnimation({ direction: 'right', delay: 200 })
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        // Simular procesamiento de pago
        setTimeout(() => setLoading(false), 2000)
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className={headerSlide.getSlideClass()}>
                <Header setSidebarOpen={setSidebarOpen} />
            </div>
            
            {/* Versión móvil del sidebar usando Sheet */}
            <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
                <SheetContent side="left" className="p-0 bg-[#F0A400] border-r-0 w-[280px] sm:max-w-[280px]">
                    <Sidebar />
                </SheetContent>
            </Sheet>
            
            {/* Layout principal - responsive */}
            <main className='grid md:grid-cols-[350px_1fr] grid-cols-[1fr]'>
                <Sidebar className="hidden md:flex" />
                <div className="p-6">
                    <Card className={`max-w-2xl mx-auto ${formSlide.getSlideClass()}`}>
                        <CardHeader>
                            <CardTitle>Realizar Pago PSE</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="space-y-4">
                                    <div className="grid gap-4 md:grid-cols-2">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">Nombre del Titular</label>
                                            <Input required placeholder="Nombre completo" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">Documento de Identidad</label>
                                            <Input required placeholder="Número de documento" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Banco</label>
                                        <select className="w-full p-2 border rounded-md">
                                            <option value="">Seleccione su banco</option>
                                            <option value="bancolombia">Bancolombia</option>
                                            <option value="davivienda">Davivienda</option>
                                            <option value="bbva">BBVA</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Monto a Pagar</label>
                                        <Input required type="number" placeholder="0.00" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Concepto de Pago</label>
                                        <Input required placeholder="Ej: Matrícula Semestre 2024-1" />
                                    </div>
                                </div>
                                <Button 
                                    type="submit" 
                                    className="w-full bg-[#0072C6] hover:bg-[#005999] transition-colors"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <div className="flex items-center justify-center">
                                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                            Procesando...
                                        </div>
                                    ) : 'Realizar Pago'}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </main> 
        </div>
    )
}

export default PseMainComponent