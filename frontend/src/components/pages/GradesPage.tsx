import { GradesTable } from "@/components/grades/GradesTable";
import Header from "@/components/mainpage/Header";
import Sidebar from "@/components/mainpage/Sidebar";
import { useState } from "react";

function GradesPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      <Header setSidebarOpen={setSidebarOpen} />
      <div className="flex">
        <div className={`${sidebarOpen ? 'block' : 'hidden'} md:block flex-shrink-0`}>
          <Sidebar />
        </div>
        <main className="flex-1">
          <div className="container mx-auto py-6">
            <div className="mb-6">
              <h1 className="text-2xl font-bold">Calificaciones</h1>
              <p className="text-muted-foreground">Consulta tu historial académico</p>
            </div>
            <div className="bg-white rounded-lg shadow-md">
              <GradesTable />
            </div>
          </div>
        </main>
      </div>
    </div>
  )}

export default GradesPage;