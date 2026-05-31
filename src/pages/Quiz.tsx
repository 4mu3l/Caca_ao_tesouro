import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { questoesMock, respostasMock, gerarId } from "../data/mock";
import type { Questao } from "../types";

export default function Quiz() {
  const navigate = useNavigate();
  const { usuario } = useAuth();
  const [questoesPendentes, setQuestoesPendentes] = useState<Questao[]>([]);
  const [questaoAtual, setQuestaoAtual] = useState(0);
  const [carregando, setCarregando] = useState(true);
  const [enviando, setEnviando] = useState(false);
  const [alternativaSelecionada, setAlternativaSelecionada] = useState<"A" | "B" | "C" | "D" | null>(null);
  const [feedback, setFeedback] = useState<{ acertou: boolean; pontos: number } | null>(null);

  useEffect(() => {
    if (!usuario) {
      navigate("/");
      return;
    }
    carregarQuestoes();
  }, [usuario]);

  function carregarQuestoes() {
    const respondidas = new Set(
      respostasMock.filter((r) => r.usuario_id === usuario!.id).map((r) => r.questao_id)
    );
    const pendentes = questoesMock.filter((q) => !respondidas.has(q.id));
    setQuestoesPendentes(pendentes);
    setCarregando(false);
  }

  function selecionarAlternativa(letra: "A" | "B" | "C" | "D") {
    if (enviando || feedback) return; // não permite trocar depois de confirmar
    setAlternativaSelecionada(letra);
  }

  function confirmarResposta() {
    if (!usuario || questoesPendentes.length === 0 || !alternativaSelecionada || enviando) return;

    const questao = questoesPendentes[questaoAtual];
    setEnviando(true);

    const acertou = alternativaSelecionada === questao.resposta_correta;
    const pontos_ganhos = acertou ? questao.pontos_acerto : questao.pontos_erro;

    respostasMock.push({
      id: gerarId(),
      usuario_id: usuario.id,
      questao_id: questao.id,
      resposta_marcada: alternativaSelecionada,
      acertou,
      pontos_ganhos,
      respondida_em: new Date().toISOString(),
    });

    setFeedback({ acertou, pontos: pontos_ganhos });

    setTimeout(() => {
      setFeedback(null);
      setAlternativaSelecionada(null);
      if (questaoAtual < questoesPendentes.length - 1) {
        setQuestaoAtual((prev) => prev + 1);
      } else {
        navigate("/home");
      }
      setEnviando(false);
    }, 2000);
  }

  if (carregando) {
    return (
      <div className="quiz-container">
        <div className="carregando">🏴‍☠️ Carregando o tesouro...</div>
      </div>
    );
  }

  if (questoesPendentes.length === 0) {
    return (
      <div className="quiz-container">
        <div className="quiz-card">
          <h2>🎉 Parabéns!</h2>
          <p>Você respondeu todas as questões disponíveis!</p>
          <button className="btn-primario" onClick={() => navigate("/home")}>
            Voltar para Home
          </button>
        </div>
      </div>
    );
  }

  const questao = questoesPendentes[questaoAtual];
  const progresso = ((questaoAtual + 1) / questoesPendentes.length) * 100;

  return (
    <div className="quiz-container">
      <header className="quiz-header">
        <div className="usuario-info">
          <span>👤 {usuario?.apelido}</span>
        </div>
        <div className="progresso-barra">
          <div className="progresso-preenchido" style={{ width: `${progresso}%` }} />
        </div>
        <span className="progresso-texto">
          Questão {questaoAtual + 1} de {questoesPendentes.length}
        </span>
      </header>

      <div className="quiz-card">
        <h2 className="pergunta">{questao.pergunta}</h2>

        <div className="alternativas">
          {(["A", "B", "C", "D"] as const).map((letra) => {
            const isSelecionada = alternativaSelecionada === letra;
            const isCorreta = feedback && questao.resposta_correta === letra;
            const isErradaSelecionada = feedback && !feedback.acertou && isSelecionada;

            let classe = "alternativa";
            if (isSelecionada && !feedback) classe += " selecionada";
            if (isCorreta && feedback) classe += " correta";
            if (isErradaSelecionada) classe += " errada-selecionada";

            return (
              <button
                key={letra}
                className={classe}
                onClick={() => selecionarAlternativa(letra)}
                disabled={!!feedback}
              >
                <span className="letra">{letra}</span>
                <span className="texto">
                  {letra === "A" ? questao.alternativa_a :
                   letra === "B" ? questao.alternativa_b :
                   letra === "C" ? questao.alternativa_c :
                   questao.alternativa_d}
                </span>
              </button>
            );
          })}
        </div>

        {/* Botão Confirmar Resposta */}
        {!feedback && (
          <div style={{ marginTop: "24px", textAlign: "center" }}>
            <button
              className="btn-primario"
              onClick={confirmarResposta}
              disabled={!alternativaSelecionada || enviando}
              style={{ maxWidth: "300px" }}
            >
              {enviando ? "Enviando..." : "Confirmar Resposta"}
            </button>
          </div>
        )}

        {feedback && (
          <div className={`feedback ${feedback.acertou ? "acerto" : "erro"}`}>
            {feedback.acertou
              ? ` Acertou! +${feedback.pontos} pontos`
              : ` Errou! ${feedback.pontos} ponto`}
          </div>
        )}
      </div>

      {/* Botão Voltar ao Menu na parte inferior */}
      <div className="quiz-footer">
        <button 
          className="btn-voltar-menu" 
          onClick={() => navigate("/home")} 
          disabled={enviando}
        >
           Voltar ao Menu
        </button>
      </div>
    </div>
  );
}