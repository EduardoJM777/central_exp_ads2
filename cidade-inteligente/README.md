# Cidade Inteligente — Central de Experiências ADS

Simulação interativa em que o visitante administra uma cidade por cinco rodadas. Cada decisão altera mobilidade, sustentabilidade, segurança, bem-estar e orçamento.

## Estrutura

```text
Cidade-Inteligente-ADS/
├── frontend/   Angular 22
└── backend/    Node.js 24.20.0, Express e SQLite
```

## Executar

Use Node.js 24.20.0. Abra dois terminais.

No Git Bash deste computador, também é possível iniciar tudo com um comando:

```bash
cd ~/Downloads/Cidade-Inteligente-ADS
bash iniciar-projeto.sh
```

```bash
cd backend
npm install
npm run dev
```

```bash
cd frontend
npm install
npm start
```

Acesse `http://localhost:4201`. A API utiliza `http://localhost:3334`. A porta 4201 permite executar esta experiência ao mesmo tempo que o Sistema Invadido na porta 4200.

## Experiência

- Cinco cenários sorteados entre dez situações urbanas.
- Mapa isométrico noturno, moradores animados e sensores em tempo real.
- Caixa inicial de R$ 20 milhões, custos reais por decisão e bloqueio quando não há saldo.
- Decisões sobre trânsito, transporte, energia, iluminação, saúde, lixo, chuva, qualidade do ar, saneamento e inclusão digital.
- Consequências imediatas e explicação da tecnologia utilizada.
- Prestação de contas final com cada investimento, total aplicado e saldo do mandato.
- Cinco indicadores urbanos, pontuação, perfil final e ranking persistente.
- Todos os dados e eventos são fictícios e educativos.
