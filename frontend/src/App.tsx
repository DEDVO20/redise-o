import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LoginPage } from "./components/pages/LoginPage";
import { DashboardPage } from "./components/pages/DashboardPage";
import { RegisterPage } from "./components/pages/RegisterPage";
import { TestConnectionPage } from "./components/pages/TestConnectionPage";
import { ProtectedRoute } from "./components/pages/ProtectedRoute";
import { AdminProtectedRoute } from "./components/pages/AdminProtectedRoute";
import { useAuth } from "./lib/auth-context";

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <LoginPage />} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        } />
        <Route path="/register" element={
          <AdminProtectedRoute>
            <RegisterPage />
          </AdminProtectedRoute>
        } />
        <Route path="/test-connection" element={
          <ProtectedRoute>
            <TestConnectionPage />
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App
