import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LoginPage } from "./components/pages/LoginPage";
import { DashboardPage } from "./components/pages/DashboardPage";
import { ProtectedRoute } from "./components/pages/ProtectedRoute";
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
      </Routes>
    </BrowserRouter>
  );
}

export default App
