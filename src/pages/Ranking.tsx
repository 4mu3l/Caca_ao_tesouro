import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
<<<<<<< HEAD

import { useAuth } from "../context/AuthContext";
import { useWebSocket } from "../context/WebSocketContext";
=======
import { useAuth } from "../context/AuthContext";
>>>>>>> 3a11d1742b95cb1d71351df28770f8ea5be5d7f1
import { calcularRanking } from "../data/mock";
import type { RankingItem } from "../types";

export default function Ranking() {
  const navigate = useNavigate();
  const { usuario, logout } = useAuth();
<<<<<<< HEAD
  const { adicionarListener } = useWebSocket();

=======
>>>>>>> 3a11d1742b95cb1d71351df28770f8ea5be5d7f1
  const [ranking, setRanking] = useState<RankingItem[]>([]);

  useEffect(() => {
    if (!usuario) {
      navigate("/");
      return;
    }
<<<<<<< HEAD

    setRanking(calcularRanking());

    const removerListener = adicionarListener(() => {
      setRanking(calcularRanking());
    });

    return () => {
      removerListener();
    };
  }, [usuario, navigate, adicionarListener]);
=======
    setRanking(calcularRanking());
  }, [usuario]);
>>>>>>> 3a11d1742b95cb1d71351df28770f8ea5be5d7f1

  return (
    <div className="ranking-container">
      <header className="ranking-header">
        <h1>🏆 Ranking dos Caçadores</h1>
<<<<<<< HEAD

        <div className="acoes">
          <button className="btn-secundario" onClick={() => navigate("/quiz")}>
            Voltar ao Quiz
          </button>

          <button className="btn-sair" onClick={logout}>
            Sair
          </button>
=======
        <div className="acoes">
          <button className="btn-secundario" onClick={() => navigate("/quiz")}>
             Voltar ao Quiz
          </button>
          <button className="btn-sair" onClick={logout}>Sair</button>
>>>>>>> 3a11d1742b95cb1d71351df28770f8ea5be5d7f1
        </div>
      </header>

      <div className="ranking-card">
        {ranking.length === 0 ? (
<<<<<<< HEAD
          <p className="vazio">
            Ninguém respondeu questões ainda. Seja o primeiro! 🏴‍☠️
          </p>
=======
          <p className="vazio">Ninguém respondeu questões ainda. Seja o primeiro! 🏴‍☠️</p>
>>>>>>> 3a11d1742b95cb1d71351df28770f8ea5be5d7f1
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
<<<<<<< HEAD

=======
>>>>>>> 3a11d1742b95cb1d71351df28770f8ea5be5d7f1
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
<<<<<<< HEAD

=======
>>>>>>> 3a11d1742b95cb1d71351df28770f8ea5be5d7f1
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
<<<<<<< HEAD
}
=======
}
>>>>>>> 3a11d1742b95cb1d71351df28770f8ea5be5d7f1
