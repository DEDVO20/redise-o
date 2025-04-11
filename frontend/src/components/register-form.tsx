import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/lib/auth-context"

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [formData, setFormData] = useState({
    nombre: "",
    documento: "",
    correo: "",
    password: "",
    confirmPassword: "",
    carrera_id: "",
    rol_id: "2" // Por defecto, rol de estudiante
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const { token } = useAuth()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)

    // Validaciones básicas
    if (formData.password !== formData.confirmPassword) {
      setError("Las contraseñas no coinciden")
      return
    }

    if (!formData.nombre || !formData.documento || !formData.password) {
      setError("Por favor complete todos los campos obligatorios")
      return
    }

    setLoading(true)

    try {
      const response = await fetch('/api/students/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          nombre: formData.nombre,
          documento: formData.documento,
          correo: formData.correo,
          password: formData.password,
          carrera_id: formData.carrera_id ? parseInt(formData.carrera_id) : null,
          rol_id: parseInt(formData.rol_id)
        })
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Error al registrar estudiante")
      }

      const data = await response.json()
      setSuccess("Estudiante registrado exitosamente")
      
      // Limpiar formulario después de éxito
      setFormData({
        nombre: "",
        documento: "",
        correo: "",
        password: "",
        confirmPassword: "",
        carrera_id: "",
        rol_id: "2"
      })
    } catch (err: any) {
      setError(err.message || "Error al registrar estudiante")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={cn("flex flex-col gap-6 animate-fadeIn", className)} {...props}>
      <Card className="overflow-hidden animate-scaleIn">
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="animate-slideUp">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Registro de Estudiante</h1>
                <p className="text-muted-foreground text-balance">
                  Complete el formulario para registrar un nuevo estudiante
                </p>
              </div>
              
              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                  {error}
                </div>
              )}
              
              {success && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
                  {success}
                </div>
              )}
              
              <div className="grid gap-2">
                <Label htmlFor="nombre">Nombre Completo *</Label>
                <Input
                  id="nombre"
                  name="nombre"
                  type="text"
                  placeholder="Nombre completo"
                  value={formData.nombre}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="documento">Documento de Identidad *</Label>
                <Input
                  id="documento"
                  name="documento"
                  type="text"
                  placeholder="12345678"
                  value={formData.documento}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="correo">Correo Electrónico</Label>
                <Input
                  id="correo"
                  name="correo"
                  type="email"
                  placeholder="ejemplo@correo.com"
                  value={formData.correo}
                  onChange={handleChange}
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="password">Contraseña *</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Contraseña"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="confirmPassword">Confirmar Contraseña *</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirmar contraseña"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="carrera_id">Carrera</Label>
                <Input
                  id="carrera_id"
                  name="carrera_id"
                  type="text"
                  placeholder="ID de la carrera"
                  value={formData.carrera_id}
                  onChange={handleChange}
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="rol_id">Rol</Label>
                <Input
                  id="rol_id"
                  name="rol_id"
                  type="text"
                  placeholder="ID del rol (2 para estudiante)"
                  value={formData.rol_id}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Registrando..." : "Registrar Estudiante"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}