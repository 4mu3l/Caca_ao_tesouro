<<<<<<< HEAD
import {
  createContext,
  useContext,
  useEffect,
  useCallback,
  useState,
  useRef,
  type ReactNode,
} from "react";
=======
import { createContext, useContext, useEffect, useCallback, useState, useRef, type ReactNode } from "react";
>>>>>>> 3a11d1742b95cb1d71351df28770f8ea5be5d7f1
import type { RankingItem } from "../types";
import { atualizarRankingRemoto, calcularRanking } from "../data/mock";

interface WebSocketContextType {
  conectado: boolean;
  ranking: RankingItem[];
  enviarResposta: (dados: any) => void;
  adicionarListener: (callback: () => void) => () => void;
}

<<<<<<< HEAD
const WebSocketContext = createContext<WebSocketContextType | undefined>(
  undefined,
);
=======
const WebSocketContext = createContext<WebSocketContextType | undefined>(undefined);
>>>>>>> 3a11d1742b95cb1d71351df28770f8ea5be5d7f1

// Lista de listeners para notificar quando ranking é atualizado
const listeners = new Set<() => void>();

export function WebSocketProvider({ children }: { children: ReactNode }) {
  const [conectado, setConectado] = useState(false);
  const wsRef = useRef<WebSocket | null>(null);
  const [ranking, setRanking] = useState<RankingItem[]>([]);
  const [_, setUpdateTrigger] = useState(0);

  // Conectar ao servidor WebSocket
  useEffect(() => {
    // Usa a URL do .env ou localhost como padrão
    const wsUrl = (import.meta as any).env.VITE_WS_URL || "ws://localhost:8080";
    const websocket = new WebSocket(wsUrl);

    websocket.onopen = () => {
      console.log("✅ Conectado ao servidor WebSocket");
      setConectado(true);
      wsRef.current = websocket;

      // Enviar dados do usuário ao conectar
      const usuario = localStorage.getItem("usuario_caca_tesouro");
      if (usuario) {
        const u = JSON.parse(usuario);
<<<<<<< HEAD

        const rankingLocal = calcularRanking();
        const usuarioNoRanking = rankingLocal.find(
          (r: RankingItem) => r.id === u.id,
        );
=======
        
        const rankingLocal = calcularRanking();
        const usuarioNoRanking = rankingLocal.find((r: RankingItem) => r.id === u.id);
>>>>>>> 3a11d1742b95cb1d71351df28770f8ea5be5d7f1

        websocket.send(
          JSON.stringify({
            tipo: "conectar",
            usuarioId: u.id,
            apelido: u.apelido,
            pontos: usuarioNoRanking?.pontos || 0,
            questoes_respondidas: usuarioNoRanking?.questoes_respondidas || 0,
            acertos: usuarioNoRanking?.acertos || 0,
            erros: usuarioNoRanking?.erros || 0,
<<<<<<< HEAD
          }),
=======
          })
>>>>>>> 3a11d1742b95cb1d71351df28770f8ea5be5d7f1
        );
      }
    };

    websocket.onmessage = (event) => {
      const mensagem = JSON.parse(event.data);

<<<<<<< HEAD
      if (mensagem.tipo === "participantes_online") {
        mensagem.dados.forEach((participante: any) => {
          atualizarRankingRemoto(participante);
        });

        listeners.forEach((callback) => callback());
        setUpdateTrigger((prev) => prev + 1);
      }

      if (mensagem.tipo === "atualizar_ranking") {
        atualizarRankingRemoto(mensagem.dados);

        listeners.forEach((callback) => callback());
=======
      if (mensagem.tipo === "atualizar_ranking") {
        console.log("🎯 Ranking atualizado!", mensagem.dados);
        atualizarRankingRemoto(mensagem.dados);
        // Notificar todos os listeners
        listeners.forEach((callback) => callback());
        // Forçar re-render
>>>>>>> 3a11d1742b95cb1d71351df28770f8ea5be5d7f1
        setUpdateTrigger((prev) => prev + 1);
      }
    };

    websocket.onclose = () => {
      console.log("❌ Desconectado do servidor WebSocket");
      setConectado(false);
      wsRef.current = null;
    };

    websocket.onerror = (erro) => {
      console.error("❌ Erro WebSocket:", erro);
    };

    return () => {
      if (websocket.readyState === WebSocket.OPEN) {
        websocket.close();
      }
    };
  }, []);

  const enviarResposta = useCallback((dados: any) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(
        JSON.stringify({
          tipo: "resposta_respondida",
          dados,
<<<<<<< HEAD
        }),
=======
        })
>>>>>>> 3a11d1742b95cb1d71351df28770f8ea5be5d7f1
      );
      console.log("📤 Resposta enviada ao servidor");
    }
  }, []);

  const adicionarListener = useCallback((callback: () => void) => {
    listeners.add(callback);
    return () => {
      listeners.delete(callback);
    };
  }, []);

  return (
<<<<<<< HEAD
    <WebSocketContext.Provider
      value={{ conectado, ranking, enviarResposta, adicionarListener }}
    >
=======
    <WebSocketContext.Provider value={{ conectado, ranking, enviarResposta, adicionarListener }}>
>>>>>>> 3a11d1742b95cb1d71351df28770f8ea5be5d7f1
      {children}
    </WebSocketContext.Provider>
  );
}

export function useWebSocket() {
  const ctx = useContext(WebSocketContext);
<<<<<<< HEAD
  if (!ctx)
    throw new Error("useWebSocket deve ser usado dentro de WebSocketProvider");
  return ctx;
}
=======
  if (!ctx) throw new Error("useWebSocket deve ser usado dentro de WebSocketProvider");
  return ctx;
}

>>>>>>> 3a11d1742b95cb1d71351df28770f8ea5be5d7f1
