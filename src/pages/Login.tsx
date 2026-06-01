import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { obterTodosUsuarios } from "../data/mock";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [nomeCompleto, setNomeCompleto] = useState("");
  const [erro, setErro] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErro("");

    const usuarios = obterTodosUsuarios();
    const usuario = usuarios.find(
      (u) => u.nome_completo === nomeCompleto.trim()
    );

    if (!usuario) {
      setErro("Nome completo não encontrado. Cadastre-se primeiro!");
      return;
    }

    login(usuario);
    navigate("/home");
  }

  return (
    <div className="cadastro-container">
      <div className="cadastro-card">
        <h1> Caça ao Tesouro</h1>
        <p className="subtitulo">Entre com seu nome completo</p>

        <form onSubmit={handleSubmit}>
          <div className="campo">
            <label htmlFor="nomeCompleto">Nome Completo</label>
            <input
              id="nomeCompleto"
              type="text"
              placeholder="Seu nome completo cadastrado"
              value={nomeCompleto}
              onChange={(e) => setNomeCompleto(e.target.value)}
              required
            />
          </div>

          {erro && <div className="erro">{erro}</div>}

          <button type="submit" className="btn-primario">
             Entrar
          </button>
        </form>

        <p className="link-login">
          Ainda não tem conta?{" "}
          <button className="btn-link" onClick={() => navigate("/")}>
            Cadastre-se
          </button>
        </p>
      </div>
    </div>
  );
}
