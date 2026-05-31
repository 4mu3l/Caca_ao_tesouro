import type { Questao, Usuario, Resposta } from "../types";

export let usuariosMock: Usuario[] = [];
export let respostasMock: Resposta[] = [];

const CHAVE_USUARIOS = "usuarios_caca_tesouro";
const CHAVE_RESPOSTAS = "respostas_caca_tesouro";

// Funções para gerenciar usuários no localStorage
export function obterTodosUsuarios(): Usuario[] {
  const salvo = localStorage.getItem(CHAVE_USUARIOS);
  return salvo ? JSON.parse(salvo) : [];
}

export function registrarNovoUsuario(usuario: Usuario): void {
  const usuarios = obterTodosUsuarios();
  usuarios.push(usuario);
  localStorage.setItem(CHAVE_USUARIOS, JSON.stringify(usuarios));
}

// Funções para gerenciar respostas no localStorage
export function obterTodasRespostas(): Resposta[] {
  const salvo = localStorage.getItem(CHAVE_RESPOSTAS);
  return salvo ? JSON.parse(salvo) : [];
}

const CHAVE_RANKING_REMOTO = "ranking_remoto_caca_tesouro";

export function atualizarRankingRemoto(dadosRemotos: any) {
  const salvo = localStorage.getItem(CHAVE_RANKING_REMOTO);
  const rankingRemoto = salvo ? JSON.parse(salvo) : {};
  rankingRemoto[dadosRemotos.usuario_id] = dadosRemotos;
  localStorage.setItem(CHAVE_RANKING_REMOTO, JSON.stringify(rankingRemoto));
}

export function obterRankingRemoto() {
  const salvo = localStorage.getItem(CHAVE_RANKING_REMOTO);
  return salvo ? JSON.parse(salvo) : {};
}

export const questoesMock: Questao[] = [
  { id: 1, pergunta: "Qual questão melhor define o conceito amplo de violência estudado no projeto?", alternativa_a: "Apenas a agressão física direta", alternativa_b: "Discussões de opinião entre duas pessoas", alternativa_c: "Apenas os crimes graves que estão previstos no Código Penal", alternativa_d: "Uso intencional da força ou do poder que pode causar danos físicos, psíquicos ou sociais", resposta_correta: "D", pontos_acerto: 5, pontos_erro: 1 },
  { id: 2, pergunta: "O bullying e o cyberbullying são formas de violência que se caracterizam por:", alternativa_a: "Brincadeiras isoladas que acontecem uma única vez entre amigos", alternativa_b: "Críticas construtivas feitas para ajudar no desempenho escolar", alternativa_c: "Agressões intencionais, verbais ou físicas, feitas de maneira repetitiva contra alguém", alternativa_d: "Conflitos normais que ajudam a fortalecer o caráter da vítima", resposta_correta: "C", pontos_acerto: 5, pontos_erro: 1 },
  { id: 3, pergunta: "Você presencia um colega sendo alvo de piadas humilhantes repetitivas no grupo de mensagens da turma. Qual atitude demonstra maior consciência social?", alternativa_a: "Sair do grupo e fingir que não viu nada", alternativa_b: "Rir junto para não virar o próximo alvo", alternativa_c: "Acolher a vítima, manifestar-se contra a piada e reportar à coordenação", alternativa_d: "Desafiar o agressor para uma briga física fora da escola", resposta_correta: "C", pontos_acerto: 5, pontos_erro: 1 },
  { id: 4, pergunta: "Quando uma pessoa sofre discriminação, piadas ofensivas ou exclusão social devido à sua orientação sexual ou identidade de gênero, estamos diante de:", alternativa_a: "Liberdade de expressão absoluta do agressor", alternativa_b: "Conflito casual de opiniões pessoais", alternativa_c: "Homofobia, que configura uma forma de violência social e crime", alternativa_d: "Discussão saudável sobre comportamento", resposta_correta: "C", pontos_acerto: 5, pontos_erro: 1 },
  { id: 5, pergunta: "Quando uma pessoa sofre preconceito racial ou discriminação baseada na cor de sua pele, isso deve ser entendido como:", alternativa_a: "Violência social e estrutural, que perpetua desigualdades históricas", alternativa_b: "Apenas uma opinião pessoal sem impacto na sociedade", alternativa_c: "Uma brincadeira inocente que foi mal interpretada", alternativa_d: "Um desentendimento natural do cotidiano urbano", resposta_correta: "A", pontos_acerto: 5, pontos_erro: 1 },
  { id: 6, pergunta: "Um cliente se recusa a ser atendido por um funcionário devido à cor da pele dele. Como os cidadãos ao redor devem agir conscientemente?", alternativa_a: "Ignorar, pois o cliente tem o direito de escolher quem o atende", alternativa_b: "Esperar o gerente resolver para não estragar o ambiente", alternativa_c: "Posicionar-se contra a atitude, apoiar o funcionário e lembrar que o racismo é crime", alternativa_d: "Filmar para postar nas redes sociais em busca de curtidas, sem interferir", resposta_correta: "C", pontos_acerto: 5, pontos_erro: 1 },
  { id: 7, pergunta: "O feminicídio representa a expressão mais extrema da violência contra a mulher. Ele é definido como:", alternativa_a: "Qualquer homicídio que ocorra em áreas urbanas populosas", alternativa_b: "Um crime que acontece exclusivamente em períodos de guerra", alternativa_c: "O assassinato de mulheres motivado por violência doméstica, menosprezo ou discriminação à condição de mulher", alternativa_d: "Um acidente fatal decorrente de brigas casuais de trânsito", resposta_correta: "C", pontos_acerto: 5, pontos_erro: 1 },
  { id: 8, pergunta: "Uma vizinha sofre ameaças constantes e agressões verbais do companheiro. O que deve ser feito para evitar uma tragédia como o feminicídio?", alternativa_a: "Não interferir, pois em briga de marido e mulher não se deve interferir", alternativa_b: "Romper o silêncio e denunciar o caso ligando para as autoridades competentes", alternativa_c: "Esperar que a própria vítima tome a iniciativa de ir à delegacia sozinha", alternativa_d: "Apenas conversar com o agressor de forma amigável para pedir calma", resposta_correta: "B", pontos_acerto: 5, pontos_erro: 1 },
  { id: 9, pergunta: "O abuso sexual nas relações sociais está profundamente ligado ao abuso de poder. A base para identificar e combater essa violência é:", alternativa_a: "Analisar o tipo de vestimenta ou o comportamento social da vítima", alternativa_b: "Considerar que a violência só ocorre se houver agressão física visível", alternativa_c: "A ausência de consentimento pleno e o uso de coerção, ameaça ou vulnerabilidade da vítima", alternativa_d: "Ignorar casos que acontecem dentro de relacionamentos de longa data", resposta_correta: "C", pontos_acerto: 5, pontos_erro: 1 },
  { id: 10, pergunta: "O trabalho escravo contemporâneo se caracteriza por:", alternativa_a: "Receber um salário abaixo do piso da categoria por escolha própria", alternativa_b: "Submissão a trabalhos forçados, jornadas exaustivas, condições degradantes ou restrição de locomoção por dívida", alternativa_c: "Cumprir horas extras voluntárias para aumentar a renda familiar", alternativa_d: "Trabalhar no setor informal da economia sem carteira assinada", resposta_correta: "B", pontos_acerto: 5, pontos_erro: 1 },
  { id: 11, pergunta: "Você descobre que uma confecção mantém trabalhadores ilegalmente, com jornadas de 16 horas por dia e retendo documentos. A decisão consciente correta é:", alternativa_a: "Comprar as roupas assim mesmo por serem mais baratas", alternativa_b: "Ignorar, visto que a empresa gera empregos para quem precisa", alternativa_c: "Realizar uma denúncia anônima aos órgãos de fiscalização do trabalho", alternativa_d: "Tentar invadir o local sozinho para libertar as pessoas pela força", resposta_correta: "C", pontos_acerto: 5, pontos_erro: 1 },
  { id: 12, pergunta: "A prática de maus-tratos aos animais (abandono, agressão, privação de alimento e água) é considerada:", alternativa_a: "Uma escolha particular do tutor sobre sua propriedade", alternativa_b: "Um problema biológico natural da cadeia alimentar", alternativa_c: "Um crime e uma manifestação de crueldade que reflete a cultura da violência", alternativa_d: "Um comportamento aceitável desde que ocorra dentro de propriedades privadas", resposta_correta: "C", pontos_acerto: 5, pontos_erro: 1 },
  { id: 13, pergunta: "Você encontra um animal trancado em uma varanda sob sol escaldante, visivelmente desnutrido e sem água há dias. Qual a conduta cidadã correta?", alternativa_a: "Seguir em frente, imaginando que o dono logo irá cuidar dele", alternativa_b: "Jogar comida de longe e considerar o problema totalmente resolvido", alternativa_c: "Registrar a negligência com fotos ou vídeos e acionar as autoridades de proteção ambiental ou a polícia", alternativa_d: "Adotar um tom violento e agredir o proprietário do imóvel publicamente", resposta_correta: "C", pontos_acerto: 5, pontos_erro: 1 },
  { id: 14, pergunta: "Atacar templos, ridicularizar vestimentas sagradas ou discriminar alguém devido à sua crença são atos de intolerância religiosa. Esse fenômeno:", alternativa_a: "É uma forma legítima de defender a própria religião", alternativa_b: "Viola o direito constitucional à liberdade de crença e cultos", alternativa_c: "Não possui relação com os conflitos históricos violentos", alternativa_d: "Ocorre apenas em países teocráticos fora do Brasil", resposta_correta: "B", pontos_acerto: 5, pontos_erro: 1 },
  { id: 15, pergunta: "Pierre Bourdieu considera como violência simbólica toda coerção que só se institui por intermédio da adesão que o dominado acorda ao dominante. Qual exemplo disso ligado aos temas estudados?", alternativa_a: "Uma agressão física direta contra um cidadão", alternativa_b: "Um acidente de trânsito em uma grande avenida", alternativa_c: "A reprodução de 'piadas' ou comentários preconceituosos aceitos como 'normais'", alternativa_d: "Uma competição esportiva acirrada entre duas equipes", resposta_correta: "C", pontos_acerto: 5, pontos_erro: 1 },
  { id: 16, pergunta: "Com base nas ideias de Michel Foucault sobre poder, julgue os itens: (1) O poder atua somente por meio da violência física direta. (2) Relações escolares (Bullying) e de trabalho também podem expressar relações de poder. (3) O poder interfere na maneira como os indivíduos agem e pensam. (4) Para Foucault, o poder depende exclusivamente das leis do Estado. Qual alternativa está correta?", alternativa_a: "F – V – V – F", alternativa_b: "V – F – V – F", alternativa_c: "F – V – F – V", alternativa_d: "V – V – F – F", resposta_correta: "A", pontos_acerto: 5, pontos_erro: 1 },
  { id: 17, pergunta: "Com base nas ideias de Michel Foucault, é correto afirmar que o poder:", alternativa_a: "Está concentrado exclusivamente nas instituições políticas", alternativa_b: "Se manifesta apenas por meio da violência física", alternativa_c: "Atua nas relações sociais influenciando comportamentos e condutas", alternativa_d: "Depende unicamente da força militar para existir", resposta_correta: "C", pontos_acerto: 5, pontos_erro: 1 },
  { id: 18, pergunta: "A repetição constante de cenas de agressão e discursos de ódio nos meios de comunicação e redes sociais pode provocar:", alternativa_a: "Uma resolução pacífica e rápida de conflitos urbanos", alternativa_b: "A naturalização da violência, fazendo com que práticas agressivas sejam percebidas como comuns no cotidiano", alternativa_c: "Um aumento imediato da empatia social e solidariedade", alternativa_d: "O isolamento total dos indivíduos em relação à internet", resposta_correta: "B", pontos_acerto: 5, pontos_erro: 1 },
  { id: 19, pergunta: "O conceito de Necropolítica nos ajuda a compreender:", alternativa_a: "O funcionamento das democracias liberais representativas", alternativa_b: "As cláusulas tradicionais dos contratos sociais", alternativa_c: "Como populações marginalizadas (vítimas de racismo estrutural ou homofobia) são as mais afetadas pela violência letal", alternativa_d: "A aplicação uniforme e justa das leis trabalhistas", resposta_correta: "C", pontos_acerto: 5, pontos_erro: 1 },
  { id: 20, pergunta: "Para Durkheim, a cultura da violência e a reprodução coletiva de preconceitos estruturais na sociedade podem ser entendidas como um:", alternativa_a: "Fato social, que exerce uma força externa e coercitiva sobre o comportamento individual", alternativa_b: "Costume meramente individual e isolado", alternativa_c: "Problema puramente biológico e hereditário", alternativa_d: "Evento temporário que se extingue sem ações educativas", resposta_correta: "A", pontos_acerto: 5, pontos_erro: 1 },
];

// Helpers
export function gerarId(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

export function calcularRanking() {
  const usuarios = obterTodosUsuarios();
  const respostas = obterTodasRespostas();
  
  const map = new Map<string, { id: string; nome_completo?: string; apelido: string; pontos: number; respondidas: number; acertos: number; erros: number }>();

  for (const u of usuarios) {
    map.set(u.id, { id: u.id, nome_completo: u.nome_completo, apelido: u.apelido, pontos: 0, respondidas: 0, acertos: 0, erros: 0 });
  }

  for (const r of respostas) {
    const entry = map.get(r.usuario_id);
    if (entry) {
      entry.pontos += r.pontos_ganhos;
      entry.respondidas++;
      if (r.acertou) entry.acertos++;
      else entry.erros++;
    }
  }

  const rankingRemoto = obterRankingRemoto();
  for (const id in rankingRemoto) {
    if (!map.has(id)) {
      const remoto = rankingRemoto[id];
      map.set(id, {
        id: remoto.usuario_id,
        apelido: remoto.apelido,
        pontos: remoto.pontos,
        respondidas: remoto.questoes_respondidas,
        acertos: remoto.acertos,
        erros: remoto.erros
      });
    }
  }

  return Array.from(map.values())
    .map((e) => ({
      id: e.id,
      nome_completo: e.nome_completo || "",
      apelido: e.apelido,
      pontos: e.pontos,
      questoes_respondidas: e.respondidas,
      acertos: e.acertos,
      erros: e.erros,
    }))
    .sort((a, b) => b.pontos - a.pontos);
}