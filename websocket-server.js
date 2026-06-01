import { WebSocketServer, WebSocket } from "ws";
import http from "http";

const PORT = process.env.PORT || 8080;

// Criar um servidor HTTP simples
const server = http.createServer();

// Criar servidor WebSocket
const wss = new WebSocketServer({ server });

// Armazenar clientes conectados
const clientes = new Map();

wss.on("connection", (ws) => {
  console.log("🎮 Novo cliente conectado");

  // Quando recebe uma mensagem
  ws.on("message", (data) => {
    try {
      const mensagem = JSON.parse(data);

      console.log("📨 Mensagem recebida:", mensagem.tipo);

      // Se for registro de novo usuário
      if (mensagem.tipo === "conectar") {
        const dadosUsuario = {
          usuario_id: mensagem.usuarioId,
          apelido: mensagem.apelido,
          pontos: mensagem.pontos || 0,
          questoes_respondidas: mensagem.questoes_respondidas || 0,
          acertos: mensagem.acertos || 0,
          erros: mensagem.erros || 0,
        };

        clientes.set(ws, dadosUsuario);

        // Envia todos os usuários já conectados para quem acabou de entrar
        const participantes = Array.from(clientes.values());

        ws.send(
          JSON.stringify({
            tipo: "participantes_online",
            dados: participantes,
          }),
        );

        // Avisa todos os outros que esse usuário entrou
        wss.clients.forEach((client) => {
          if (client !== ws && client.readyState === WebSocket.OPEN) {
            client.send(
              JSON.stringify({
                tipo: "atualizar_ranking",
                dados: dadosUsuario,
              }),
            );
          }
        });
      }

      // Se for resposta respondida
      if (mensagem.tipo === "resposta_respondida") {
        console.log(`📝 ${mensagem.apelido} respondeu uma questão`);

        // Enviar para TODOS os clientes (broadcast)
        wss.clients.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(
              JSON.stringify({
                tipo: "atualizar_ranking",
                dados: mensagem.dados,
              }),
            );
          }
        });
      }
    } catch (erro) {
      console.error("❌ Erro ao processar mensagem:", erro.message);
    }
  });

  // Quando cliente desconecta
  ws.on("close", () => {
    const cliente = clientes.get(ws);
    if (cliente) {
      console.log(`👋 ${cliente.apelido} desconectado`);
      clientes.delete(ws);
    }
  });

  // Erros
  ws.on("error", (erro) => {
    console.error("❌ Erro WebSocket:", erro.message);
  });
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Servidor WebSocket rodando na porta ${PORT}`);
});
