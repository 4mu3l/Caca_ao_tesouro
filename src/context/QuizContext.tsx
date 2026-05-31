import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react";
import type { Usuario, Resposta } from "../types";

interface QuizContextType {
  respostas: Resposta[];
  registrarResposta: (resposta: Resposta) => void;
  obterRespostasUsuario: (usuarioId: string) => Resposta[];
  obterPontosUsuario: (usuarioId: string) => number;
  obterAcertosUsuario: (usuarioId: string) => number;
  obterErrosUsuario: (usuarioId: string) => number;
  limparRespostasUsuario: (usuarioId: string) => void;
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

const CHAVE_ARMAZENAMENTO = "respostas_caca_tesouro";

export function QuizProvider({ children }: { children: ReactNode }) {
  const [respostas, setRespostas] = useState<Resposta[]>(() => {
    const salvo = localStorage.getItem(CHAVE_ARMAZENAMENTO);
    return salvo ? JSON.parse(salvo) : [];
  });

  // Salvar no localStorage sempre que respostas mudarem
  useEffect(() => {
    localStorage.setItem(CHAVE_ARMAZENAMENTO, JSON.stringify(respostas));
  }, [respostas]);

  const registrarResposta = useCallback((resposta: Resposta) => {
    setRespostas((prev) => {
      // Evitar duplicatas
      const jaExiste = prev.some(
        (r) => r.usuario_id === resposta.usuario_id && r.questao_id === resposta.questao_id
      );
      if (jaExiste) {
        return prev.map((r) =>
          r.usuario_id === resposta.usuario_id && r.questao_id === resposta.questao_id
            ? resposta
            : r
        );
      }
      return [...prev, resposta];
    });
  }, []);

  const obterRespostasUsuario = useCallback((usuarioId: string) => {
    return respostas.filter((r) => r.usuario_id === usuarioId);
  }, [respostas]);

  const obterPontosUsuario = useCallback((usuarioId: string) => {
    return obterRespostasUsuario(usuarioId).reduce((total, r) => total + r.pontos_ganhos, 0);
  }, [obterRespostasUsuario]);

  const obterAcertosUsuario = useCallback((usuarioId: string) => {
    return obterRespostasUsuario(usuarioId).filter((r) => r.acertou).length;
  }, [obterRespostasUsuario]);

  const obterErrosUsuario = useCallback((usuarioId: string) => {
    return obterRespostasUsuario(usuarioId).filter((r) => !r.acertou).length;
  }, [obterRespostasUsuario]);

  const limparRespostasUsuario = useCallback((usuarioId: string) => {
    setRespostas((prev) => prev.filter((r) => r.usuario_id !== usuarioId));
  }, []);

  return (
    <QuizContext.Provider
      value={{
        respostas,
        registrarResposta,
        obterRespostasUsuario,
        obterPontosUsuario,
        obterAcertosUsuario,
        obterErrosUsuario,
        limparRespostasUsuario,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

export function useQuiz() {
  const ctx = useContext(QuizContext);
  if (!ctx) throw new Error("useQuiz deve ser usado dentro de QuizProvider");
  return ctx;
}
