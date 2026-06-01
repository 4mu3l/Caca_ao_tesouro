<<<<<<< HEAD
import { WebSocketServer, WebSocket } from "ws";
import http from "http";
=======
import { WebSocketServer, WebSocket } from 'ws';
import http from 'http';
>>>>>>> 3a11d1742b95cb1d71351df28770f8ea5be5d7f1

const PORT = process.env.PORT || 8080;

// Criar um servidor HTTP simples
const server = http.createServer();

// Criar servidor WebSocket
const wss = new WebSocketServer({ server });

// Armazenar clientes conectados
const clientes = new Map();

<<<<<<< HEAD
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
=======
wss.on('connection', (ws) => {
  console.log('🎮 Novo cliente conectado');

  // Quando recebe uma mensagem
  ws.on('message', (data) => {
    try {
      const mensagem = JSON.parse(data);
      
      console.log('📨 Mensagem recebida:', mensagem.tipo);

      // Se for registro de novo usuário
      if (mensagem.tipo === 'conectar') {
        clientes.set(ws, {
          usuarioId: mensagem.usuarioId,
          apelido: mensagem.apelido,
        });
        console.log(`✅ ${mensagem.apelido} conectado`);
        
        // Broadcast the connected user's stats so everyone has their initial data
>>>>>>> 3a11d1742b95cb1d71351df28770f8ea5be5d7f1
        wss.clients.forEach((client) => {
          if (client !== ws && client.readyState === WebSocket.OPEN) {
            client.send(
              JSON.stringify({
<<<<<<< HEAD
                tipo: "atualizar_ranking",
                dados: dadosUsuario,
              }),
=======
                tipo: 'atualizar_ranking',
                dados: {
                  usuario_id: mensagem.usuarioId,
                  apelido: mensagem.apelido,
                  pontos: mensagem.pontos || 0,
                  questoes_respondidas: mensagem.questoes_respondidas || 0,
                  acertos: mensagem.acertos || 0,
                  erros: mensagem.erros || 0
                }
              })
>>>>>>> 3a11d1742b95cb1d71351df28770f8ea5be5d7f1
            );
          }
        });
      }

      // Se for resposta respondida
<<<<<<< HEAD
      if (mensagem.tipo === "resposta_respondida") {
        console.log(`📝 ${mensagem.apelido} respondeu uma questão`);

=======
      if (mensagem.tipo === 'resposta_respondida') {
        console.log(`📝 ${mensagem.apelido} respondeu uma questão`);
        
>>>>>>> 3a11d1742b95cb1d71351df28770f8ea5be5d7f1
        // Enviar para TODOS os clientes (broadcast)
        wss.clients.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(
              JSON.stringify({
<<<<<<< HEAD
                tipo: "atualizar_ranking",
                dados: mensagem.dados,
              }),
=======
                tipo: 'atualizar_ranking',
                dados: mensagem.dados,
              })
>>>>>>> 3a11d1742b95cb1d71351df28770f8ea5be5d7f1
            );
          }
        });
      }
    } catch (erro) {
<<<<<<< HEAD
      console.error("❌ Erro ao processar mensagem:", erro.message);
=======
      console.error('❌ Erro ao processar mensagem:', erro.message);
>>>>>>> 3a11d1742b95cb1d71351df28770f8ea5be5d7f1
    }
  });

  // Quando cliente desconecta
<<<<<<< HEAD
  ws.on("close", () => {
=======
  ws.on('close', () => {
>>>>>>> 3a11d1742b95cb1d71351df28770f8ea5be5d7f1
    const cliente = clientes.get(ws);
    if (cliente) {
      console.log(`👋 ${cliente.apelido} desconectado`);
      clientes.delete(ws);
    }
  });

  // Erros
<<<<<<< HEAD
  ws.on("error", (erro) => {
    console.error("❌ Erro WebSocket:", erro.message);
  });
});

server.listen(PORT, "0.0.0.0", () => {
=======
  ws.on('error', (erro) => {
    console.error('❌ Erro WebSocket:', erro.message);
  });
});

server.listen(PORT, '0.0.0.0', () => {
>>>>>>> 3a11d1742b95cb1d71351df28770f8ea5be5d7f1
  console.log(`🚀 Servidor WebSocket rodando na porta ${PORT}`);
});
