import { useState, useEffect } from 'react'
import Header from '../mainpage/Header.tsx'
import Sidebar from '../mainpage/Sidebar.tsx'
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useSlideAnimation } from "@/hooks/useSlideAnimation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, CheckCircle2 } from "lucide-react"

function ProfileMainComponent() {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const { user, updateProfile, loading, error } = useAuth()
    const isAdmin = user?.rol?.nombre === 'Administrador'
    const headerSlide = useSlideAnimation({ direction: 'down', delay: 100 })
    const cardSlide = useSlideAnimation({ direction: 'right', delay: 200 })

    const [successMessage, setSuccessMessage] = useState('')
    const [validationErrors, setValidationErrors] = useState<{ [key: string]: string }>({})

    const [formData, setFormData] = useState({
        nombre: user?.nombre || '',
        correo: user?.correo || '',
        documento: user?.documento || '',
        carrera: user?.carrera?.nombre || 'No asignada',
        semestre: user?.semestre?.nombre || 'No asignado',
        password: '',
        confirmPassword: ''
    })

    useEffect(() => {
        if (user) {
            setFormData(prev => ({
                ...prev,
                nombre: user.nombre || '',
                correo: user.correo || '',
                documento: user.documento || '',
                carrera: user.carrera?.nombre || 'No asignada',
                semestre: user.semestre?.nombre || 'No asignado',
            }))
        }
    }, [user])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
        if (validationErrors[name]) {
            setValidationErrors(prev => {
                const newErrors = { ...prev }
                delete newErrors[name]
                return newErrors
            })
        }
    }

    const validateForm = () => {
        const errors: { [key: string]: string } = {}
        if (formData.correo && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.correo)) {
            errors.correo = 'El correo electrónico no es válido'
        }
        if (formData.password) {
            if (formData.password.length < 6) {
                errors.password = 'La contraseña debe tener al menos 6 caracteres'
            }
            if (formData.password !== formData.confirmPassword) {
                errors.confirmPassword = 'Las contraseñas no coinciden'
            }
        }
        setValidationErrors(errors)
        return Object.keys(errors).length === 0
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setSuccessMessage('')
        if (!validateForm()) return

        const updateData: { [key: string]: string } = {}

        if (isAdmin && formData.nombre !== user?.nombre) {
            updateData.nombre = formData.nombre
        }

        if (formData.correo !== user?.correo) {
            updateData.correo = formData.correo
        }

        if (formData.password && formData.password === formData.confirmPassword) {
            updateData.password = formData.password
        }

        if (Object.keys(updateData).length === 0) {
            setIsEditing(false)
            return
        }

        const success = await updateProfile(updateData)

        if (success) {
            setSuccessMessage('Perfil actualizado correctamente')
            setFormData(prev => ({
                ...prev,
                password: '',
                confirmPassword: ''
            }))
            setIsEditing(false)
        }
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className={headerSlide.getSlideClass()}>
                <Header setSidebarOpen={setSidebarOpen} />
            </div>

            <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
                <SheetContent side="left" className="p-0 bg-[#F0A400] border-r-0 w-[280px] sm:max-w-[280px] transition-transform duration-300 ease-in-out transform">
                    <Sidebar />
                </SheetContent>
            </Sheet>

            <main className='grid md:grid-cols-[350px_1fr] grid-cols-[1fr]'>
                <Sidebar className="hidden md:flex" />
                <div className="p-6">
                    <Card className={`max-w-3xl mx-auto ${cardSlide.getSlideClass()}`}>
                        <CardHeader className="pb-0">
                            <CardTitle className="text-center text-xl">Perfil de Usuario</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {error && (
                                    <Alert variant="destructive" className="mb-4">
                                        <AlertCircle className="h-4 w-4" />
                                        <AlertDescription>{error}</AlertDescription>
                                    </Alert>
                                )}

                                {successMessage && (
                                    <Alert className="mb-4 bg-green-50 text-green-800 border-green-200">
                                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                                        <AlertDescription>{successMessage}</AlertDescription>
                                    </Alert>
                                )}

                                <div className="flex flex-col p-6 bg-[#F5F5F5] rounded-lg overflow-hidden">
                                    <div className="flex justify-center mb-4">
                                        <Avatar className="w-32 h-32 border-2 border-gray-300">
                                            <AvatarImage src="https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg" />
                                            <AvatarFallback className="text-4xl">
                                                {user?.nombre ? user.nombre.charAt(0) : 'U'}
                                            </AvatarFallback>
                                        </Avatar>
                                    </div>

                                    <div className="bg-[#002856] text-white text-center py-2 mb-4">
                                        <h3 className="text-2xl font-bold">{user?.rol?.nombre || 'Usuario'}</h3>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-4">
                                            <div>
                                                <Label htmlFor="nombre" className="font-bold text-[#002856]">Nombre:</Label>
                                                {isEditing ? (
                                                    <div>
                                                        <Input
                                                            id="nombre"
                                                            name="nombre"
                                                            value={formData.nombre}
                                                            onChange={handleChange}
                                                            className={`mt-1 ${validationErrors.nombre ? 'border-red-500' : ''}`}
                                                            disabled={!isAdmin}
                                                        />
                                                        {validationErrors.nombre && (
                                                            <p className="text-red-500 text-sm mt-1">{validationErrors.nombre}</p>
                                                        )}
                                                    </div>
                                                ) : (
                                                    <p className="font-semibold">{user?.nombre || 'No disponible'}</p>
                                                )}
                                            </div>

                                            <div>
                                                <Label htmlFor="documento" className="font-bold text-[#002856]">Documento:</Label>
                                                {isEditing ? (
                                                    <Input
                                                        id="documento"
                                                        name="documento"
                                                        value={formData.documento}
                                                        onChange={handleChange}
                                                        className="mt-1"
                                                        disabled
                                                    />
                                                ) : (
                                                    <p className="font-semibold">{user?.documento || 'No disponible'}</p>
                                                )}
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <div>
                                                <Label htmlFor="correo" className="font-bold text-[#002856]">Correo electrónico:</Label>
                                                {isEditing ? (
                                                    <div>
                                                        <Input
                                                            id="correo"
                                                            name="correo"
                                                            type="email"
                                                            value={formData.correo}
                                                            onChange={handleChange}
                                                            className={`mt-1 ${validationErrors.correo ? 'border-red-500' : ''}`}
                                                        />
                                                        {validationErrors.correo && (
                                                            <p className="text-red-500 text-sm mt-1">{validationErrors.correo}</p>
                                                        )}
                                                    </div>
                                                ) : (
                                                    <p className="font-semibold">{user?.correo || 'No disponible'}</p>
                                                )}
                                            </div>

                                            <div>
                                                <Label className="font-bold text-[#002856]">Carrera:</Label>
                                                <p className="font-semibold">{formData.carrera}</p>
                                            </div>

                                            <div>
                                                <Label className="font-bold text-[#002856]">Semestre:</Label>
                                                <p className="font-semibold">{formData.semestre}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {isEditing && (
                                        <div className="mt-6 pt-6 border-t border-gray-300">
                                            <h3 className="text-lg font-bold text-[#002856] mb-4">Cambiar Contraseña</h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div>
                                                    <Label htmlFor="password" className="font-bold text-[#002856]">Nueva Contraseña:</Label>
                                                    <Input
                                                        id="password"
                                                        name="password"
                                                        type="password"
                                                        value={formData.password}
                                                        onChange={handleChange}
                                                        className={`mt-1 ${validationErrors.password ? 'border-red-500' : ''}`}
                                                    />
                                                    {validationErrors.password && (
                                                        <p className="text-red-500 text-sm mt-1">{validationErrors.password}</p>
                                                    )}
                                                </div>
                                                <div>
                                                    <Label htmlFor="confirmPassword" className="font-bold text-[#002856]">Confirmar Contraseña:</Label>
                                                    <Input
                                                        id="confirmPassword"
                                                        name="confirmPassword"
                                                        type="password"
                                                        value={formData.confirmPassword}
                                                        onChange={handleChange}
                                                        className={`mt-1 ${validationErrors.confirmPassword ? 'border-red-500' : ''}`}
                                                    />
                                                    {validationErrors.confirmPassword && (
                                                        <p className="text-red-500 text-sm mt-1">{validationErrors.confirmPassword}</p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    <div className="mt-6 flex justify-center gap-4">
                                        {isEditing ? (
                                            <>
                                                <Button type="submit" className="bg-[#002856] hover:bg-blue-800" disabled={loading}>
                                                    {loading ? 'Guardando...' : 'Guardar Cambios'}
                                                </Button>
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    onClick={() => {
                                                        setIsEditing(false)
                                                        setValidationErrors({})
                                                        setFormData({
                                                            nombre: user?.nombre || '',
                                                            correo: user?.correo || '',
                                                            documento: user?.documento || '',
                                                            carrera: user?.carrera?.nombre || 'No asignada',
                                                            semestre: user?.semestre?.nombre || 'No asignado',
                                                            password: '',
                                                            confirmPassword: ''
                                                        })
                                                    }}
                                                    disabled={loading}
                                                >
                                                    Cancelar
                                                </Button>
                                            </>
                                        ) : (
                                            <Button
                                                type="button"
                                                className="bg-[#002856] hover:bg-blue-800"
                                                onClick={() => setIsEditing(true)}
                                            >
                                                Editar Perfil
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    )
}

export default ProfileMainComponent
