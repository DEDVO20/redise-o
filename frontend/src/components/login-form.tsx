import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/lib/auth-context"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [documento, setDocumento] = useState("")
  const [password, setPassword] = useState("")
  const { login, loading, error } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (documento.trim() && password.trim()) {
      await login(documento, password)
    }
  }

  return (
    <div className={cn("flex flex-col gap-6 w-full", className)} {...props}>
      <Card className="overflow-hidden shadow-lg">
        <CardContent className="grid p-0 grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto w-full">
          <form className="p-4 sm:p-6 md:p-8" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4 sm:gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Bienvenido</h1>
                <p className="text-muted-foreground text-balance">
                  Inicia sesión con tu número de documento
                </p>
              </div>
              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                  {error}
                </div>
              )}
              <div className="grid gap-2">
                <Label htmlFor="documento">Documento de Identidad</Label>
                <Input
                  id="documento"
                  type="text"
                  placeholder="12345678"
                  value={documento}
                  onChange={(e) => setDocumento(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Contraseña</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Ingresa tu contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Iniciando sesión..." : "Iniciar Sesión"}
              </Button>

              <div className="text-center text-sm">
                ¿No tienes una cuenta?{" "}
                <a href="#" className="underline underline-offset-4">
                  Contacta a administración
                </a>
              </div>
            </div>
          </form>
          <div className="relative bg-muted h-48 sm:h-64 md:h-auto order-last md:order-last">
            <img
              src="/assets/iudc.png"
              alt="Imagen"
              className="absolute inset-0 h-full w-full object-contain sm:object-cover md:object-cover object-center dark:brightness-[0.2] dark:grayscale"
              loading="lazy"
            />
          </div>
        </CardContent>
      </Card>
      <div className="text-center text-xs text-muted-foreground text-balance [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
        Al hacer clic en continuar, aceptas nuestros{" "}
        <a href="#">Términos de Servicio</a> y{" "}
        <a href="#">Política de Privacidad</a>.
      </div>
    </div>
  )
}
