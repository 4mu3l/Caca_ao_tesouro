export interface Usuario {
  id: string;
  nome_completo: string;
  apelido: string;
  codigo_acesso: string;
  criado_em: string;
}

export interface Questao {
  id: number;
  pergunta: string;
  alternativa_a: string;
  alternativa_b: string;
  alternativa_c: string;
  alternativa_d: string;
  resposta_correta: "A" | "B" | "C" | "D";
  pontos_acerto: number;
  pontos_erro: number;
}

export interface Resposta {
  id: string;
  usuario_id: string;
  questao_id: number;
  resposta_marcada: "A" | "B" | "C" | "D";
  acertou: boolean;
  pontos_ganhos: number;
  respondida_em: string;
}

export interface RankingItem {
  id: string;
  nome_completo: string;
  apelido: string;
  pontos: number;
  questoes_respondidas: number;
  acertos: number;
  erros: number;
}

export type Alternativa = "A" | "B" | "C" | "D";
