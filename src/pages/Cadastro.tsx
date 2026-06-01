import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { obterTodosUsuarios, registrarNovoUsuario, gerarId } from "../data/mock";
import type { Usuario } from "../types";

export default function Cadastro() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [nomeCompleto, setNomeCompleto] = useState("");
  const [apelido, setApelido] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErro("");

    if (!nomeCompleto.trim() || !apelido.trim()) {
      setErro("Preencha todos os campos!");
      return;
    }

    const usuariosExistentes = obterTodosUsuarios();

    const nomeExiste = usuariosExistentes.find((u) => u.nome_completo === nomeCompleto.trim());
    if (nomeExiste) {
      setErro("Este nome completo já está cadastrado. Use outro!");
      return;
    }

    const apelidoExiste = usuariosExistentes.find((u) => u.apelido === apelido.trim());
    if (apelidoExiste) {
      setErro("Este apelido já está em uso. Escolha outro!");
      return;
    }

    setCarregando(true);

    const novoUsuario: Usuario = {
      id: gerarId(),
      nome_completo: nomeCompleto.trim(),
      apelido: apelido.trim(),
      codigo_acesso: "",
      criado_em: new Date().toISOString(),
    };

    registrarNovoUsuario(novoUsuario);
    login(novoUsuario);
    navigate("/home");
  }

  return (
    <div className="cadastro-container">
      <div className="cadastro-card">
        <h1> Caça ao Tesouro</h1>
        <p className="subtitulo">Tema: Violência e Poder</p>
        <p className="subtitulo2">Cadastre-se para participar!</p>

        <form onSubmit={handleSubmit}>
          <div className="campo">
            <label htmlFor="nomeCompleto">Nome Completo</label>
            <input
              id="nomeCompleto"
              type="text"
              placeholder="Seu nome completo"
              value={nomeCompleto}
              onChange={(e) => setNomeCompleto(e.target.value)}
              maxLength={150}
              required
            />
          </div>

          <div className="campo">
            <label htmlFor="apelido">Apelido</label>
            <input
              id="apelido"
              type="text"
              placeholder="Como quer ser chamado?"
              value={apelido}
              onChange={(e) => setApelido(e.target.value)}
              maxLength={50}
              required
            />
          </div>

          {erro && <div className="erro">{erro}</div>}

          <button type="submit" disabled={carregando} className="btn-primario">
            {carregando ? "Cadastrando..." : " Começar a Caçar!"}
          </button>
        </form>

        <p className="link-login">
          Já tem cadastro?{" "}
          <button className="btn-link" onClick={() => navigate("/login")}>
            Faça login
          </button>
        </p>
      </div>
    </div>
  );
}
