# Central de Experiências ADS

Portal interativo para apresentar projetos do curso de Análise e Desenvolvimento de Sistemas. Cada experiência permanece isolada em sua própria pasta, com frontend, backend e dependências independentes.

## Projetos

```text
central_exp_ads2/
├── src/                  Portal e menu principal (Angular 22, porta 4300)
├── sistema-invadido/     Experiência de segurança (front 4200, API 3333)
└── cidade-inteligente/   Simulador de gestão urbana (front 4201, API 3334)
```

## Preparação

Use Node.js `24.20.0` e instale as dependências uma vez:

```bash
npm install
(cd sistema-invadido/backend && npm install)
(cd sistema-invadido/frontend && npm install)
(cd cidade-inteligente/backend && npm install)
(cd cidade-inteligente/frontend && npm install)
```

## Executar tudo

No Git Bash:

```bash
bash iniciar-central.sh
```

Abra `http://localhost:4300`. O portal direciona para as experiências prontas nas portas 4200 e 4201.

Também é possível iniciar cada frontend e backend separadamente com `npm start` ou `npm run dev` dentro da pasta correspondente.

## Cidade Inteligente

- Cinco decisões sorteadas entre dez situações urbanas.
- Orçamento inicial de R$ 20 milhões e custos reais por alternativa.
- Cidade isométrica com moradores, sensores e eventos visuais.
- Prestação de contas, reserva de emergência e bônus fiscal.
- Ranking persistente em SQLite.

Os dados das experiências são fictícios e destinados à apresentação acadêmica.
