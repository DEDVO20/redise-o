import { useState } from 'react'
import Header from '../mainpage/Header.tsx'
import Sidebar from '../mainpage/Sidebar.tsx'
import { Sheet, SheetContent} from "@/components/ui/sheet"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useSlideAnimation } from "@/hooks/useSlideAnimation"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface Payment {
  id: string
  date: string
  concept: string
  amount: number
  status: 'Pagado' | 'Pendiente' | 'Vencido'
}

const mockPayments: Payment[] = [
  {
    id: '001',
    date: '2024-01-15',
    concept: 'Matrícula 2024-1',
    amount: 2500000,
    status: 'Pagado'
  },
  {
    id: '002',
    date: '2024-02-01',
    concept: 'Cuota 1',
    amount: 500000,
    status: 'Pendiente'
  },
  {
    id: '003',
    date: '2023-12-15',
    concept: 'Laboratorio',
    amount: 300000,
    status: 'Vencido'
  }
]

function WalletMainComponent() {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [payments] = useState<Payment[]>(mockPayments)
    const headerSlide = useSlideAnimation({ direction: 'down', delay: 100 })
    const summarySlide = useSlideAnimation({ direction: 'right', delay: 200 })
    const tableSlide = useSlideAnimation({ direction: 'up', delay: 300 })
    
    const totalPending = payments
        .filter(p => p.status === 'Pendiente' || p.status === 'Vencido')
        .reduce((sum, p) => sum + p.amount, 0)
    
    return (
        <div className="min-h-screen bg-gray-50">
            <div className={headerSlide.getSlideClass()}>
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
                <div className="p-6 space-y-6">
                    <Card className={summarySlide.getSlideClass()}>
                        <CardHeader>
                            <CardTitle>Resumen de Cartera</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-4 md:grid-cols-3">
                                <div className="p-4 rounded-lg bg-green-50 border border-green-200">
                                    <p className="text-sm text-green-600">Total Pagado</p>
                                    <p className="text-2xl font-bold text-green-700">
                                        ${payments
                                            .filter(p => p.status === 'Pagado')
                                            .reduce((sum, p) => sum + p.amount, 0)
                                            .toLocaleString()}
                                    </p>
                                </div>
                                <div className="p-4 rounded-lg bg-yellow-50 border border-yellow-200">
                                    <p className="text-sm text-yellow-600">Pendiente por Pagar</p>
                                    <p className="text-2xl font-bold text-yellow-700">
                                        ${totalPending.toLocaleString()}
                                    </p>
                                </div>
                                <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
                                    <p className="text-sm text-blue-600">Próximo Vencimiento</p>
                                    <p className="text-2xl font-bold text-blue-700">01/03/2024</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className={tableSlide.getSlideClass()}>
                        <CardHeader>
                            <CardTitle>Historial de Pagos</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Fecha</TableHead>
                                        <TableHead>Concepto</TableHead>
                                        <TableHead>Monto</TableHead>
                                        <TableHead>Estado</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {payments.map((payment, index) => (
                                        <TableRow 
                                            key={payment.id}
                                            className="transition-all duration-300 hover:bg-gray-50"
                                            style={{
                                                animationDelay: `${index * 100}ms`,
                                                opacity: 0,
                                                animation: `fadeIn 0.5s ease-out ${index * 100}ms forwards`
                                            }}
                                        >
                                            <TableCell>{new Date(payment.date).toLocaleDateString()}</TableCell>
                                            <TableCell>{payment.concept}</TableCell>
                                            <TableCell>${payment.amount.toLocaleString()}</TableCell>
                                            <TableCell>
                                                <span className={`px-2 py-1 rounded-full text-sm ${{
                                                    'Pagado': 'bg-green-100 text-green-800',
                                                    'Pendiente': 'bg-yellow-100 text-yellow-800',
                                                    'Vencido': 'bg-red-100 text-red-800'
                                                }[payment.status]}`}>
                                                    {payment.status}
                                                </span>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>
            </main>

            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </div>
    )
}

export default WalletMainComponent