import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Cadastro from "./pages/Cadastro";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Quiz from "./pages/Quiz";
import "./App.css";

function RotaProtegida({ children }: { children: React.ReactNode }) {
  const { usuario } = useAuth();
  return usuario ? <>{children}</> : <Navigate to="/" />;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Cadastro />} />
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<RotaProtegida><Home /></RotaProtegida>} />
      <Route path="/quiz" element={<RotaProtegida><Quiz /></RotaProtegida>} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}
