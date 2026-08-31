import { DbQuestion, DbTable } from "./db-challenge.model";

export const DB_TABLES: DbTable[] = [
    {
        name: 'alunos',
        columns: ['id', 'nome', 'turma'],
        rows: [
            [1, 'Marina', '3ºB'],
            [2, 'Lucas', '3ºA'],
            [3, 'Beatriz', '2ºC'],
            [4, 'Rafael', '3ºB'],
            [5, 'Ana', '2ºA']
        ]
    },
    {
        name: 'tentativas',
        columns: ['aluno_id', 'experiencia', 'pontuacao'],
        rows: [
            [1, 'Desafio da Lógica', 180],
            [1, 'Sistema Invadido', 150],
            [1, 'Código Misterioso', 130],
            [2, 'Código Misterioso', 90],
            [3, 'Desafio da Lógica', 220],
            [4, 'Cidade Inteligente', 140],
            [4, 'Desafio da Lógica', 95],
            [5, 'Sistema Invadido', 200]
        ]
    }
];

export const DB_QUESTIONS: DbQuestion[] = [
    {
        id: 'db-01',
        scenario: 'O sistema possui milhares de registros. Você precisa encontrar a informação certa.',
        prompt: 'Qual aluno obteve a maior pontuação no Desafio da Lógica?',
        options: ['Marina', 'Rafael', 'Beatriz', 'Lucas'],
        correctIndex: 2,
        sql:
            "SELECT nome FROM alunos JOIN tentativas ON alunos.id = tentativas.aluno_id\nWHERE experiencia = 'Desafio da Lógica'\nORDER BY pontuacao DESC LIMIT 1;",
        feedback: 
            'Você cruzou duas tabelas para achar uma resposta - isso é exatamente o que um JOIN faz em um banco de dados relacional.',
        timeLimitSeconds: 50
    },
    {
        id: 'db-02',
        scenario: 'Nem toda pergunta pede um nome - às vezes pede uma contagem.',
        prompt: 'Quantos alunos diferentes tentaram o Sistema Invadido?',
        options: ['1', '2', '3', '4'],
        correctIndex: 1,
        sql:
            "SELECT COUNT(DISTINCT aluno_id) FROM tentativas\nWHERE experiencia = 'Sistema Invadido';",
        feedback: 
            'Você contou registros únicos em vez de repetidos - essa é a diferença entre contar linhas e contar pessoas em uma consulta.',
        timeLimitSeconds: 45
    },
    {
        id: 'db-03',
        scenario: 'Filtrar por um grupo e somar valores é uma combinação muito comum.',
        prompt: 'Somando todas as tentativas, qual aluno da turma 3ºB tem a maior pontuação total?',
        options: ['Marina', 'Rafael', 'Lucas', 'Ana'],
        correctIndex: 0,
        sql:
            "SELECT nome, SUM(pontuacao) AS total FROM alunos JOIN tentativas ON alunos.id = tentativas.aluno_id\nWHERE turma = '3ºB' GROUP BY nome\nORDER BY total DESC LIMIT 1;",
        feedback: 
            'Você filtrou por turma e depois somou os resultados de cada aluno - isso é um GROUP BY funcionando na sua cabeça.',
        timeLimitSeconds: 55
    },
    {
        id: 'db-04',
        scenario: 'Uma média pode revelar algo que a soma total esconde.',
        prompt: 'Qual experiência teve a maior pontuação média entre os alunos que a tentaram?',
        options: ['Desafio da Lógica', 'Sistema Invadido', 'Código Misterioso', 'Cidade Inteligente'],
        correctIndex: 1,
        sql:
            "SELECT experiencia, AVG(pontuacao) AS media FROM tentativas\nGROUP BY experiencia\nORDER BY media DESC LIMIT 1;",
        feedback: 
            'Você calculou uma média por categoria - é assim que um sistema descobre qual desafio é mais bem-sucedido, não só o mais popular.',
        timeLimitSeconds: 55
    },
    {
        id: 'db-05',
        scenario: 'Às vezes o dado mais interessante é a variedade, não o total.',
        prompt: 'Qual aluno participou do maior número de experiências diferentes?',
        options: ['Marina', 'Rafael', 'Lucas', 'Ana'],
        correctIndex: 0,
        sql:
            "SELECT nome, COUNT(DISTINCT experiencia) AS variedade FROM alunos JOIN tentativas ON alunos.id = tentativas.aluno_id\nGROUP BY nome\nORDER BY variedade DESC LIMIT 1;",
        feedback: 
            'Você reconheceu que "quantas vezes jogou" é diferente de "quantos tipos diferentes jogou" - modelar essa distinção é decisão de banco de dados.',
        timeLimitSeconds: 50
    }
];