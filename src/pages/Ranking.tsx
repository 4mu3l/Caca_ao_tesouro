import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { calcularRanking } from "../data/mock";
import type { RankingItem } from "../types";

export default function Ranking() {
  const navigate = useNavigate();
  const { usuario, logout } = useAuth();
  const [ranking, setRanking] = useState<RankingItem[]>([]);

  useEffect(() => {
    if (!usuario) {
      navigate("/");
      return;
    }
    setRanking(calcularRanking());
  }, [usuario]);

  return (
    <div className="ranking-container">
      <header className="ranking-header">
        <h1>🏆 Ranking dos Caçadores</h1>
        <div className="acoes">
          <button className="btn-secundario" onClick={() => navigate("/quiz")}>
             Voltar ao Quiz
          </button>
          <button className="btn-sair" onClick={logout}>Sair</button>
        </div>
      </header>

      <div className="ranking-card">
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
  );
}
