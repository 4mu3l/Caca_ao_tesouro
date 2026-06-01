import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import type { Usuario } from "../types";

interface AuthContextType {
  usuario: Usuario | null;
  login: (usuario: Usuario) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(() => {
    const salvo = localStorage.getItem("usuario_caca_tesouro");
    return salvo ? JSON.parse(salvo) : null;
  });

  const login = useCallback((usuario: Usuario) => {
    setUsuario(usuario);
    localStorage.setItem("usuario_caca_tesouro", JSON.stringify(usuario));
  }, []);

  const logout = useCallback(() => {
    setUsuario(null);
    localStorage.removeItem("usuario_caca_tesouro");
  }, []);

  return (
    <AuthContext.Provider value={{ usuario, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth deve ser usado dentro de AuthProvider");
  return ctx;
}
