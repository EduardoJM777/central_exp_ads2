# Central de Experiências ADS

O portal Angular reúne as experiências em rotas internas. Cidade Inteligente e Sistema Invadido compartilham o mesmo backend Node 24.20.0.

## Organização

- Portal: `src/`.
- Frontend do Sistema Invadido: `sistema-invadido/frontend/src/app/`.
- Frontend da Cidade: `sistema-invadido/frontend/src/app/cidade-inteligente/`.
- Backend compartilhado: `sistema-invadido/backend/`.
- Módulo da Cidade na API: `sistema-invadido/backend/src/cidade-inteligente/`.
- Banco SQLite compartilhado: tabelas `ranking` e `city_ranking`. Os resultados existentes não são apagados.

## Rodar localmente

Use Node 24.20.0. Instale as dependências com `npm ci` na raiz e em `sistema-invadido/backend`. Depois execute `bash iniciar-central.sh` no Git Bash.

Portal: http://localhost:4300. Backend: http://localhost:3333.
Cidade: /experiencias/cidade-inteligente. API da Cidade: /api/cidade.
Não é necessário iniciar um servidor na porta 4201.

## Hospedagem

O frontend da Cidade usa a API local ao abrir em localhost e a API existente em https://sistema-invadido-api.onrender.com nos demais hosts.
Publique o portal pela raiz do repositório e atualize o serviço backend existente no Render, cuja raiz é `sistema-invadido/backend`, com `npm ci && npm run build` e `npm start`.
Configure `FRONTEND_URL` com a origem do portal hospedado (ou origens separadas por vírgulas). O backend precisa estar atualizado para disponibilizar /api/cidade.
Mantenha `DATABASE_PATH` em armazenamento persistente para conservar os rankings.
