import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useWebSocket } from "../context/WebSocketContext";
import { calcularRanking, questoesMock, obterTodasRespostas } from "../data/mock";
import type { RankingItem } from "../types";

export default function Home() {
  const navigate = useNavigate();
  const { usuario, logout } = useAuth();
  const { adicionarListener, conectado } = useWebSocket();
  const [ranking, setRanking] = useState<RankingItem[]>([]);

  // Carregamento inicial do ranking
  useEffect(() => {
    if (!usuario) {
      navigate("/");
      return;
    }
    setRanking(calcularRanking());
  }, [usuario]);

  // Registrar listener para atualizações do WebSocket
  useEffect(() => {
    const unsubscribe = adicionarListener(() => {
      console.log("Atualizando ranking...");
      setRanking(calcularRanking());
    });

    return unsubscribe;
  }, [adicionarListener]);

  const totalQuestoes = questoesMock.length;
  const minhasRespostas = obterTodasRespostas().filter((r) => r.usuario_id === usuario?.id);
  const questoesRestantes = totalQuestoes - minhasRespostas.length;

  function handleSair() {
    logout();
    navigate("/");
  }

  return (
    <div className="home-container">
      {/* Header com usuário e sair */}
      <header className="home-header">
        <div className="home-usuario">
          <span className="home-avatar">🏴‍☠️</span>
          <div>
            <h2>Olá, {usuario?.apelido}!</h2>
            <p>{usuario?.nome_completo}</p>
          </div>
          <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "8px" }}>
            <div style={{
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              backgroundColor: conectado ? "#4CAF50" : "#999",
              boxShadow: conectado ? "0 0 8px #4CAF50" : "none",
            }} />
            <span style={{ fontSize: "12px", color: conectado ? "#4CAF50" : "#999" }}>
              {conectado ? "Online" : "Offline"}
            </span>
          </div>
        </div>
        <button className="btn-sair-home" onClick={handleSair}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#E53935"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
          <span>Sair</span>
        </button>
      </header>

      {/* RANKING — PRIMEIRA COISA */}
      <div className="home-ranking-section">
        <div className="ranking-card">
          <h2 className="ranking-titulo"> Ranking dos Caçadores</h2>
          {ranking.length === 0 ? (
            <p className="vazio">Ninguém respondeu questões ainda. Seja o primeiro! 🏴‍☠️</p>
          ) : (
            <table className="ranking-tabela">
              <thead>
                <tr>
                  <th>Posição</th>
                  <th>Apelido</th>
                  <th>Pontos</th>
                  <th>Respondidas</th>
                  <th>Acertos</th>
                  <th>Erros</th>
                </tr>
              </thead>
              <tbody>
                {ranking.map((item, index) => (
                  <tr
                    key={item.id}
                    className={item.id === usuario?.id ? "destaque-usuario" : ""}
                  >
                    <td className="posicao">
                      {index === 0 && "🥇"}
                      {index === 1 && "🥈"}
                      {index === 2 && "🥉"}
                      {index > 2 && `#${index + 1}`}
                    </td>
                    <td className="apelido">{item.apelido}</td>
                    <td className="pontos">{item.pontos}</td>
                    <td>{item.questoes_respondidas}</td>
                    <td className="acertos">{item.acertos}</td>
                    <td className="erros">{item.erros}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Botão iniciar quiz */}
      <div className="home-acao">
        {questoesRestantes > 0 ? (
          <>
            
            <button className="btn-quiz-home" onClick={() => navigate("/quiz")}>
               Continuar Caçada
            </button>
          {/* MINI CARD DE ALERTA - ADICIONADO ABAIXO DO BOTÃO */}
            <div className="mini-card-alerta">
              <div className="alerta-icone">!</div>
                <p className="faltam">Faltam {questoesRestantes} questões para você responder!</p>
            </div>
          </>
        ) : (
          <div className="mini-card-alerta">
              <div className="alerta-icone">!</div>
          <p className="home-restantes home-completo"> Você completou todas as questões!</p>
          </div>
        )}
      </div>
    </div>
  );
}
