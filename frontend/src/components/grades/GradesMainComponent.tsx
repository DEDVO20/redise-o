import { useState } from 'react'
import Header from '../mainpage/Header.tsx'
import Sidebar from '../mainpage/Sidebar.tsx'
import { Sheet, SheetContent} from "@/components/ui/sheet"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useSlideAnimation } from "@/hooks/useSlideAnimation"
import {GradesTable} from "./GradesTable"

function GradesMainComponent() {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const mainContentSlide = useSlideAnimation({ direction: 'right', delay: 200 })
    const headerSlide = useSlideAnimation({ direction: 'down', delay: 100 })
    
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
                <div className={`p-6 ${mainContentSlide.getSlideClass()}`}>
                    <Card className="mb-6">
                        <CardHeader>
                            <CardTitle>Calificaciones del Semestre</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <GradesTable />
                        </CardContent>
                    </Card>
                </div>
            </main> 
        </div>
    )
}

export default GradesMainComponent