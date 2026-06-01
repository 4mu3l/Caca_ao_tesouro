# Relatório de Modificações - Caça ao Tesouro (Sincronização em Tempo Real)

Este documento detalha todas as modificações realizadas no projeto **Caça ao Tesouro** para implementar a sincronização em tempo real do ranking entre múltiplos dispositivos.

---

## 1. Modificação em `src/data/mock.ts`

**Objetivo:** Permitir que as estatísticas enviadas por jogadores remotos sejam salvas no navegador local e contabilizadas na função de cálculo do ranking, combinando dados locais com remotos.

**Alterações Realizadas:**
- Criação da constante `CHAVE_RANKING_REMOTO`.
- Implementação da função `atualizarRankingRemoto(dadosRemotos: any)`, que salva a pontuação do jogador no `localStorage` sob a chave `ranking_remoto_caca_tesouro`.
- Implementação da função `obterRankingRemoto()`, que recupera as pontuações guardadas.
- Atualização da função `calcularRanking()`:
  - O mapa (Map) foi modificado para armazenar diretamente as propriedades das estatísticas ao invés de aninhar o objeto `Usuario`.
  - Inclusão de um loop adicional para resgatar os dados do `rankingRemoto` e injetá-los no mapa do ranking global, unindo jogadores locais e os remotos conectados via WebSocket.

---

## 2. Modificação em `src/context/WebSocketContext.tsx`

**Objetivo:** Interceptar as mensagens do WebSocket e atualizar o estado do jogo e o `localStorage` com os novos dados de ranking, além de notificar o servidor sobre os pontos do usuário no momento da conexão.

**Alterações Realizadas:**
- **Importação:** Adição de `atualizarRankingRemoto` e `calcularRanking` importados de `../data/mock`.
- **Evento de Conexão (`onopen`):** O payload de envio da mensagem do tipo `"conectar"` foi expandido. Agora ele busca o score atual do jogador através da função `calcularRanking()` e envia seus pontos, acertos, erros e quantidade de questões respondidas logo na conexão inicial.
- **Evento de Mensagem (`onmessage`):** Quando a mensagem do tipo `"atualizar_ranking"` é recebida, o contexto agora invoca a função `atualizarRankingRemoto(mensagem.dados)` para registrar a nova pontuação recebida antes de notificar os *listeners* (o que faz a interface atualizar).

---

## 3. Modificações em `websocket-server.js`

**Objetivo:** Fazer com que o servidor WebSocket passe a agir como um verdadeiro distribuidor (broadcaster) não apenas das respostas, mas da presença inicial, e adaptar o código para usar módulos modernos do JavaScript.

**Alterações Realizadas:**
- **Refatoração para ES Modules:** Os `require` (CommonJS) foram substituídos por `import`, e instanciamento do `WebSocketServer` ajustado, visto que o projeto Vite utiliza `"type": "module"`.
- **Evento `"conectar"`:** O servidor passou a realizar um *broadcast* sempre que um novo jogador entra. Quando o cliente envia seus dados de conexão iniciais (agora contendo seus pontos e status), o servidor repassa esses dados a todos os demais clientes através da mensagem `"atualizar_ranking"`. Isso garante que novos jogadores apareçam no ranking das outras telas instantaneamente, com a pontuação correta.

---

## Resumo do Funcionamento Atual

1. Um novo jogador entra: ele envia seus dados com seus pontos locais via evento `"conectar"`.
2. O Servidor recebe, guarda na memória, e emite `"atualizar_ranking"` para todos.
3. Os clientes recebem, gravam as pontuações no `localStorage` de `ranking_remoto` e atualizam a tela simultaneamente.
4. Quando alguém responde a uma questão, o mesmo fluxo acontece, mas via evento `"resposta_respondida"`, garantindo um *Real-Time Ranking* descentralizado e funcional.
