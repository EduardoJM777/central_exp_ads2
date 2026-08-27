import type { Challenge } from '../domain/challenge.js';

export const challenges: Challenge[] = [
  {
    id: 'senha-segura', title: 'Senha Comprometida', level: 'NÍVEL 1 — INICIANTE',
    briefing: 'O sistema encontrou três senhas. Uma delas é mais difícil de adivinhar porque mistura letras, números e símbolo.',
    prompt: 'Qual senha parece mais segura?', options: ['123456', 'escola', 'Escola#2026'], answer: 'Escola#2026', answerHint: '',
    clues: ['Evite sequências como 123456.', 'Usar somente uma palavra também é fraco.', 'Procure a opção com letras, número e símbolo.'],
    explanation: 'Senhas variadas são mais difíceis de adivinhar. Em sistemas reais, também é importante não reutilizá-las.', timeLimitSeconds: 90,
  },
  {
    id: 'arquivo-suspeito', title: 'Anexo Suspeito', level: 'NÍVEL 1 — INICIANTE',
    briefing: 'Um e-mail da escola deveria trazer um trabalho para leitura, mas um dos anexos pode executar um programa.',
    prompt: 'Qual arquivo merece mais cuidado antes de abrir?', options: ['trabalho.pdf', 'foto.jpg', 'trabalho.exe'], answer: 'trabalho.exe', answerHint: '',
    clues: ['PDF costuma ser documento.', 'JPG costuma ser imagem.', 'EXE é um programa executável.'],
    explanation: 'Arquivos EXE executam programas e podem ser perigosos quando chegam de uma fonte desconhecida.', timeLimitSeconds: 90,
  },
  {
    id: 'mensagem-falsa', title: 'Mensagem Falsa', level: 'NÍVEL 1 — INICIANTE',
    briefing: 'A mensagem diz: “Sua conta será apagada agora! Clique aqui e envie sua senha”.',
    prompt: 'Como você classificaria essa mensagem?', options: ['Mensagem normal', 'Possível golpe', 'Atualização segura'], answer: 'Possível golpe', answerHint: '',
    clues: ['Ela tenta causar medo e pressa.', 'Um serviço confiável não deveria pedir sua senha por mensagem.', 'A opção mais segura é desconfiar.'],
    explanation: 'Golpes digitais usam urgência e links falsos para tentar roubar informações.', timeLimitSeconds: 90,
  },
  {
    id: 'cadeado-site', title: 'Site Protegido', level: 'NÍVEL 1 — INICIANTE',
    briefing: 'O navegador mostra dois sites. Um começa com HTTP e outro com HTTPS e possui um cadeado.',
    prompt: 'Qual conexão oferece mais proteção para os dados enviados?', options: ['HTTP', 'HTTPS', 'As duas são iguais'], answer: 'HTTPS', answerHint: '',
    clues: ['Observe o endereço com cadeado.', 'A letra S está ligada à conexão segura.', 'Escolha HTTPS.'],
    explanation: 'HTTPS protege a comunicação entre o navegador e o site durante o caminho.', timeLimitSeconds: 90,
  },

  {
    id: 'capacidade-digital', title: 'Memória do Servidor', level: 'NÍVEL 2 — INVESTIGADOR',
    briefing: 'A capacidade dobra em cada etapa: 2 GB, 4 GB, 8 GB, ?. Um valor desapareceu.',
    prompt: 'Qual capacidade completa a sequência?', options: ['10 GB', '12 GB', '16 GB'], answer: '16 GB', answerHint: '',
    clues: ['Cada valor é o dobro do anterior.', '8 deve ser multiplicado por 2.', '8 × 2 é 16.'],
    explanation: 'Capacidades digitais frequentemente aparecem em valores que dobram.', timeLimitSeconds: 95,
  },
  {
    id: 'rede-estranha', title: 'Acesso Diferente', level: 'NÍVEL 2 — INVESTIGADOR',
    briefing: 'Os computadores da escola aparecem como ESCOLA-01, ESCOLA-02 e VISITANTE-99.',
    prompt: 'Qual nome está fora do padrão da escola?', options: ['ESCOLA-01', 'ESCOLA-02', 'VISITANTE-99'], answer: 'VISITANTE-99', answerHint: '',
    clues: ['Dois nomes começam da mesma maneira.', 'Os computadores conhecidos começam com ESCOLA.', 'Procure o nome que começa com VISITANTE.'],
    explanation: 'Comparar padrões ajuda a identificar dispositivos desconhecidos em uma rede.', timeLimitSeconds: 95,
  },
  {
    id: 'login-incorreto', title: 'Falha no Login', level: 'NÍVEL 2 — INVESTIGADOR',
    briefing: 'O acesso correto usa o nome ADS e o código 2026. A tentativa registrada usou ADS e 2025.',
    prompt: 'O que estava incorreto?', options: ['O nome ADS', 'O código 2025', 'Nada estava incorreto'], answer: 'O código 2025', answerHint: '',
    clues: ['O nome esperado era ADS e foi digitado corretamente.', 'O código esperado era 2026.', 'A tentativa usou o código 2025.'],
    explanation: 'Sistemas de autenticação verificam se cada informação recebida corresponde ao valor esperado.', timeLimitSeconds: 95,
  },
  {
    id: 'pagina-html', title: 'Página em Código', level: 'NÍVEL 2 — INVESTIGADOR',
    briefing: 'No HTML, <h1>Central ADS</h1> representa um elemento visível da página.',
    prompt: 'O que esse código provavelmente mostra?', options: ['Um título grande', 'Uma fotografia', 'Um campo de senha'], answer: 'Um título grande', answerHint: '',
    clues: ['A letra H vem de heading, que significa título.', 'O número 1 indica o título principal.', 'O texto exibido seria Central ADS.'],
    explanation: 'HTML descreve a estrutura de uma página; h1 representa seu título principal.', timeLimitSeconds: 100,
  },

  {
    id: 'sequencia-computador', title: 'Processamento Crescente', level: 'NÍVEL 3 — DESAFIO FINAL',
    briefing: 'Um computador processa 1, 2, 4 e 8 tarefas por etapa. O número sempre dobra.',
    prompt: 'Quantas tarefas serão processadas na próxima etapa?', options: ['10', '12', '16'], answer: '16', answerHint: '',
    clues: ['A quantidade dobra em cada etapa.', 'O último valor conhecido é 8.', '8 × 2 é igual a 16.'],
    explanation: 'Você identificou a regra de crescimento usada pelo sistema e previu seu próximo resultado.', timeLimitSeconds: 100,
  },
  {
    id: 'codigo-pontos', title: 'Código Misterioso', level: 'NÍVEL 3 — DESAFIO FINAL',
    briefing: 'Um programa começa com 10 pontos e depois executa: pontos = pontos + 5.',
    prompt: 'Qual valor o programa mostrará no final?', options: ['5 pontos', '10 pontos', '15 pontos'], answer: '15 pontos', answerHint: '',
    clues: ['O valor inicial é 10.', 'A instrução acrescenta 5.', '10 + 5 é 15.'],
    explanation: 'Você interpretou a atualização de uma variável, conceito fundamental de programação.', timeLimitSeconds: 100,
  },
  {
    id: 'tabela-alunos', title: 'Busca nos Dados', level: 'NÍVEL 3 — DESAFIO FINAL',
    briefing: 'Uma tabela mostra: número 5 = ANA, número 7 = BIA e número 9 = CAIO. O sistema procura o número 7.',
    prompt: 'Qual nome o sistema encontrará?', options: ['ANA', 'BIA', 'CAIO'], answer: 'BIA', answerHint: '',
    clues: ['A busca pede exatamente o número 7.', 'Ignore os registros 5 e 9.', 'O número 7 está ligado ao nome BIA.'],
    explanation: 'Você localizou um registro usando uma condição, assim como uma consulta em banco de dados.', timeLimitSeconds: 100,
  },
  {
    id: 'binario-guiado', title: 'Código Binário', level: 'NÍVEL 3 — DESAFIO FINAL',
    briefing: 'No código binário 101, as posições valem 4, 2 e 1. Some apenas as posições que possuem o número 1.',
    prompt: 'Qual é o resultado de 4 + 1?', options: ['3', '5', '7'], answer: '5', answerHint: '',
    clues: ['O primeiro 1 vale 4.', 'O último 1 vale 1.', '4 + 1 é igual a 5.'],
    explanation: 'Você interpretou uma representação binária, usada pelos computadores para armazenar valores.', timeLimitSeconds: 105,
  },
];

