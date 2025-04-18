import { useState } from 'react'
import Header from './Header.tsx'
import Dashboard from './Dashboard.tsx'
import Sidebar from './Sidebar.tsx'
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

function MainComponent() {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    
    return (
        <>
            <Header setSidebarOpen={setSidebarOpen} />
            
            {/* Versión móvil del sidebar usando Sheet */}
            <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
                <SheetContent side="left" className="p-0 bg-[#F0A400] border-r-0 w-[280px] sm:max-w-[280px]">
                    <Sidebar />
                </SheetContent>
            </Sheet>
            
            {/* Layout principal - responsive */}
            <main className='grid md:grid-cols-[350px_1fr] grid-cols-[1fr]'>
                <Sidebar className="hidden md:flex" />
                <Dashboard />            
            </main> 
        </>

    )
}

export default MainComponent