import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LoginPage } from "./components/pages/LoginPage";
import { DashboardPage } from "./components/pages/DashboardPage";
import { RegisterPage } from "./components/pages/RegisterPage";
import { TestConnectionPage } from "./components/pages/TestConnectionPage";
import { ProtectedRoute } from "./components/pages/ProtectedRoute";
import { AdminProtectedRoute } from "./components/pages/AdminProtectedRoute";
import { useAuth } from "./lib/auth-context";
import PSEPage from './components/pages/PSEPage'
import GradesPage from './components/pages/GradesPage'
import HelpPage from './components/pages/HelpPage'
import IdPage from './components/pages/IdPage'
import WalletPage from './components/pages/WalletPage'
import ProfilePage from './components/pages/ProfilePage'


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
        <Route path="/pse" element={
          <AdminProtectedRoute>
            <PSEPage />
          </AdminProtectedRoute>
        } />
        <Route path="/notas" element={
          <AdminProtectedRoute>
            <GradesPage />
          </AdminProtectedRoute>
        } />
        <Route path="/cartera" element={
          <AdminProtectedRoute>
            <WalletPage />
          </AdminProtectedRoute>
        } />
        <Route path="/idpage" element={
          <AdminProtectedRoute>
            <IdPage />
          </AdminProtectedRoute>
        } />
        <Route path="/ayuda" element={
          <AdminProtectedRoute>
            <HelpPage />
          </AdminProtectedRoute>
        } />
        <Route path="/perfil" element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App
