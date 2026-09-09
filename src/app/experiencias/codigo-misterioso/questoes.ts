export interface MysteryQuestion {
  id: number;
  level: string;
  title: string;
  explanation: string;
  code: string;
  prompt: string;
  options: string[];
  correctIndex: number;
  feedback: string;
  timeLimitSeconds: number;
}

export const MYSTERY_QUESTIONS: MysteryQuestion[] = [
  {
    id: 1,
    level: 'Nível 1 · Variável',
    title: 'Descubra a mensagem',
    explanation:
      'Uma variável é como uma caixinha que guarda uma informação.',

    code: `NOME = "Ana"

MOSTRE "Olá, " + NOME`,

    prompt: 'O que aparecerá na tela?',

    options: [
      'Olá, Ana',
      'NOME',
      'Ana + Olá',
      'Nada'
    ],

    correctIndex: 0,

    feedback:
      'Isso! NOME guarda o texto "Ana". O comando MOSTRE junta "Olá, " com o conteúdo da variável.',

    timeLimitSeconds: 25
  },

  {
    id: 2,
    level: 'Nível 2 · Decisão',
    title: 'Entrada liberada?',
    explanation:
      'O computador pode tomar decisões comparando informações.',

    code: `IDADE = 17

SE IDADE >= 16
    MOSTRE "LIBERADO"
SENÃO
    MOSTRE "BLOQUEADO"
FIM`,

    prompt: 'Qual mensagem será exibida?',

    options: [
      'BLOQUEADO',
      'LIBERADO',
      '17',
      'IDADE'
    ],

    correctIndex: 1,

    feedback:
      'Perfeito! 17 é maior ou igual a 16, então o computador segue o caminho LIBERADO.',

    timeLimitSeconds: 30
  },

  {
    id: 3,
    level: 'Nível 3 · Repetição',
    title: 'Quantas vezes?',
    explanation:
      'Repetições servem para executar a mesma ação várias vezes sem escrever tudo de novo.',

    code: `REPITA 3 VEZES
    MOSTRE "ADS"
FIM`,

    prompt: 'Quantas vezes a palavra ADS aparecerá?',

    options: [
      '1 vez',
      '2 vezes',
      '3 vezes',
      'Para sempre'
    ],

    correctIndex: 2,

    feedback:
      'Exatamente! O bloco manda repetir a mesma ação 3 vezes. Isso é uma repetição.',

    timeLimitSeconds: 25
  },

  {
    id: 4,
    level: 'Nível 4 · Caça ao erro',
    title: 'Encontre o bug',
    explanation:
      'Um bug é um erro no programa. Aqui, o sistema deveria aplicar um desconto.',

    code: `PREÇO = 50
DESCONTO = 10

TOTAL = PREÇO + DESCONTO`,

    prompt: 'Qual linha corrigiria o cálculo?',

    options: [
      'TOTAL = PREÇO + DESCONTO',
      'TOTAL = PREÇO - DESCONTO',
      'TOTAL = PREÇO × DESCONTO',
      'TOTAL = DESCONTO'
    ],

    correctIndex: 1,

    feedback:
      'Boa! Para dar desconto precisamos diminuir 10 de 50. O correto é PREÇO - DESCONTO.',

    timeLimitSeconds: 30
  },

  {
    id: 5,
    level: 'Nível 5 · Desafio final',
    title: 'Decifre o resultado',
    explanation:
      'Agora você vai combinar variável, comparação e decisão.',

    code: `PONTOS = 80

SE PONTOS >= 70
    RESULTADO = "APROVADO"
SENÃO
    RESULTADO = "TENTE NOVAMENTE"
FIM

MOSTRE RESULTADO`,

    prompt: 'Qual será a mensagem final?',

    options: [
      '80',
      'TENTE NOVAMENTE',
      'APROVADO',
      'PONTOS'
    ],

    correctIndex: 2,

    feedback:
      'Código decifrado! Como 80 é maior ou igual a 70, RESULTADO recebe "APROVADO".',

    timeLimitSeconds: 35
  }
];