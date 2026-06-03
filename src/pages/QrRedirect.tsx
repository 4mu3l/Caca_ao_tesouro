import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Página intermediária para redirecionamento via QR Code
// URL: /qr/:id (ex: /qr/1, /qr/2, etc.)
export default function QrRedirect() {
  const navigate = useNavigate();
  const { id } = useParams(); // Captura o ID do QR Code
  const { usuario } = useAuth();

  useEffect(() => {
    // Salva o ID da questão/QR no localStorage para usar depois
    if (id) {
      localStorage.setItem("qr_redirect_id", id);
    }

    // Verifica se o usuário está logado
    if (usuario) {
      // Já tem conta → vai direto para o quiz
      console.log("Usuário logado, redirecionando para quiz...");
      navigate("/quiz", { replace: true });
    } else {
      // Não tem conta → vai para cadastro
      // Após cadastro, o sistema redireciona automaticamente para /home
      // E lá ele clica em "Continuar Caçada"
      console.log("Usuário não logado, redirecionando para cadastro...");
      navigate("/", { replace: true });
    }
  }, [usuario, navigate, id]);

  return (
    <div className="cadastro-container">
      <div className="cadastro-card">
        <h1>🏴‍☠️ Caça ao Tesouro</h1>
        <p className="subtitulo">Redirecionando...</p>
        <div className="carregando">
          {usuario 
            ? "Preparando o quiz..." 
            : "Preparando cadastro..."}
        </div>
      </div>
    </div>
  );
}