import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/lib/auth-context";

interface AdminProtectedRouteProps {
  children: ReactNode;
}

export function AdminProtectedRoute({ children }: AdminProtectedRouteProps) {
  const { isAuthenticated, user } = useAuth();

  // Verificar si el usuario está autenticado y tiene rol de administrador (rol_id === 1)
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Verificar si el usuario tiene rol de administrador
  // Asumimos que el rol_id 1 corresponde a administrador
  if (user?.rol_id !== 1) {
    // Si no es administrador, redirigir al dashboard
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}