# Sistema Invadido

Experiência gamificada da Central de Experiências ADS. Este módulo é independente do projeto Angular existente na raiz do repositório.

## Estrutura separada

```text
sistema-invadido/
├── frontend/   Angular 22 — telas, animações e interação
└── backend/    Node.js 24.20.0 — API, desafios, pontuação e ranking
```

## Como executar

É necessário usar Node.js 24.20.0. Abra dois terminais.

Backend:

```bash
cd sistema-invadido/backend
npm install
npm run dev
```

Frontend:

```bash
cd sistema-invadido/frontend
npm install
npm start
```

Depois, acesse `http://localhost:4200`.

## Funcionalidades

- Alerta visual e sonoro de invasão simulada.
- Três níveis progressivos com desafios tecnológicos de múltipla escolha.
- Perguntas sorteadas a cada partida.
- Terminal CMD animado e totalmente fictício.
- Pontuação por acerto, velocidade, pistas e tentativas.
- Ranking persistente em SQLite.
- Tela final com resultado e animação comemorativa.

Todas as atividades de segurança são simulações educativas. Nenhum sistema real é acessado.
