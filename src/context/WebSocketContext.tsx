import { createContext, useContext, useEffect, useCallback, useState, useRef, type ReactNode } from "react";
import type { RankingItem } from "../types";
import { atualizarRankingRemoto, calcularRanking } from "../data/mock";

interface WebSocketContextType {
  conectado: boolean;
  ranking: RankingItem[];
  enviarResposta: (dados: any) => void;
  adicionarListener: (callback: () => void) => () => void;
}

const WebSocketContext = createContext<WebSocketContextType | undefined>(undefined);

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
    const wsUrl = import.meta.env.VITE_WS_URL || "ws://localhost:8080";
    const websocket = new WebSocket(wsUrl);

    websocket.onopen = () => {
      console.log("✅ Conectado ao servidor WebSocket");
      setConectado(true);
      wsRef.current = websocket;

      // Enviar dados do usuário ao conectar
      const usuario = localStorage.getItem("usuario_caca_tesouro");
      if (usuario) {
        const u = JSON.parse(usuario);
        
        const rankingLocal = calcularRanking();
        const usuarioNoRanking = rankingLocal.find((r: RankingItem) => r.id === u.id);

        websocket.send(
          JSON.stringify({
            tipo: "conectar",
            usuarioId: u.id,
            apelido: u.apelido,
            pontos: usuarioNoRanking?.pontos || 0,
            questoes_respondidas: usuarioNoRanking?.questoes_respondidas || 0,
            acertos: usuarioNoRanking?.acertos || 0,
            erros: usuarioNoRanking?.erros || 0,
          })
        );
      }
    };

    websocket.onmessage = (event) => {
      const mensagem = JSON.parse(event.data);

      if (mensagem.tipo === "atualizar_ranking") {
        console.log("🎯 Ranking atualizado!", mensagem.dados);
        atualizarRankingRemoto(mensagem.dados);
        // Notificar todos os listeners
        listeners.forEach((callback) => callback());
        // Forçar re-render
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
        })
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
    <WebSocketContext.Provider value={{ conectado, ranking, enviarResposta, adicionarListener }}>
      {children}
    </WebSocketContext.Provider>
  );
}

export function useWebSocket() {
  const ctx = useContext(WebSocketContext);
  if (!ctx) throw new Error("useWebSocket deve ser usado dentro de WebSocketProvider");
  return ctx;
}

