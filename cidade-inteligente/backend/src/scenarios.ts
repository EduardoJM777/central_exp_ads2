import type { Scenario } from './domain.js';

export const scenarios: Scenario[] = [
  {
    id: 'rush-hour', round: 1, category: 'MOBILIDADE', alert: 'CONGESTIONAMENTO', title: 'Hora do Pico',
    description: 'Sensores detectaram filas crescendo em três avenidas. A cidade precisa agir antes que os ônibus atrasem.',
    liveData: 'Velocidade média: 18 km/h • 3.240 veículos ativos',
    decisions: [
      { id: 'smart-lights', title: 'Semáforos inteligentes', description: 'Ajustar o tempo dos sinais usando dados dos sensores.', investment: 3200000, technology: 'IoT + dados em tempo real', effects: { mobility: 18, sustainability: 6, wellbeing: 8, budget: -10 }, outcome: 'Os sinais se adaptaram ao fluxo. As filas diminuíram e os ônibus recuperaram parte do atraso.' },
      { id: 'extra-lanes', title: 'Liberar faixa reversível', description: 'Converter temporariamente uma faixa no sentido de maior movimento.', investment: 850000, technology: 'Painéis digitais + automação', effects: { mobility: 12, safety: -5, wellbeing: 4, budget: -4 }, outcome: 'O trânsito fluiu, mas a mudança rápida exigiu atenção extra dos motoristas.' },
      { id: 'do-nothing-traffic', title: 'Aguardar o pico passar', description: 'Não intervir e preservar o orçamento.', investment: 0, technology: 'Sem intervenção', effects: { mobility: -14, sustainability: -8, wellbeing: -10, budget: 2 }, outcome: 'O orçamento foi preservado, porém as filas e a emissão de poluentes aumentaram.' },
    ],
  },
  {
    id: 'bus-overload', round: 1, category: 'TRANSPORTE', alert: 'LOTAÇÃO', title: 'Ônibus Sobrecarregados',
    description: 'Os dados dos validadores mostram que duas linhas estão 40% acima da capacidade.', liveData: 'Ocupação: 140% • Espera média: 24 minutos',
    decisions: [
      { id: 'dynamic-buses', title: 'Enviar ônibus extras', description: 'Usar a localização da frota para reforçar apenas as linhas críticas.', investment: 2900000, technology: 'GPS + API de transporte', effects: { mobility: 16, sustainability: 3, wellbeing: 12, budget: -11 }, outcome: 'A frota foi redistribuída e o tempo de espera caiu rapidamente.' },
      { id: 'free-bikes', title: 'Liberar bicicletas públicas', description: 'Oferecer viagens gratuitas de bicicleta por duas horas.', investment: 1100000, technology: 'Aplicativo + estações conectadas', effects: { mobility: 9, sustainability: 13, wellbeing: 6, budget: -6 }, outcome: 'Parte dos passageiros escolheu bicicletas, reduzindo a pressão sobre os ônibus.' },
      { id: 'fixed-schedule', title: 'Manter horários atuais', description: 'Evitar alterações na operação planejada.', investment: 0, technology: 'Grade fixa', effects: { mobility: -12, wellbeing: -13, budget: 2 }, outcome: 'As linhas continuaram lotadas e a espera aumentou.' },
    ],
  },
  {
    id: 'energy-peak', round: 2, category: 'ENERGIA', alert: 'CONSUMO ELEVADO', title: 'Pico de Energia',
    description: 'O consumo público subiu 28%. Se continuar assim, bairros podem sofrer interrupções à noite.', liveData: 'Rede em 88% da capacidade • 31°C',
    decisions: [
      { id: 'adaptive-led', title: 'Iluminação LED adaptativa', description: 'Reduzir a intensidade onde sensores não detectam movimento.', investment: 2600000, technology: 'LED + sensores de presença', effects: { sustainability: 18, safety: 5, wellbeing: 5, budget: -10 }, outcome: 'O consumo caiu sem apagar as ruas. Sensores mantiveram áreas movimentadas bem iluminadas.' },
      { id: 'solar-batteries', title: 'Ativar baterias solares', description: 'Usar a energia armazenada nos prédios municipais.', investment: 3900000, technology: 'Energia solar + rede inteligente', effects: { sustainability: 15, wellbeing: 8, budget: -16 }, outcome: 'As baterias aliviaram a rede e evitaram interrupções, com custo operacional elevado.' },
      { id: 'park-blackout', title: 'Apagar parques', description: 'Desligar totalmente a iluminação das áreas verdes.', investment: 120000, technology: 'Corte manual', effects: { sustainability: 7, safety: -16, wellbeing: -8, budget: 3 }, outcome: 'O consumo caiu, mas moradores evitaram os parques por falta de segurança.' },
    ],
  },
  {
    id: 'dark-streets', round: 2, category: 'SEGURANÇA', alert: 'FALHA DE ILUMINAÇÃO', title: 'Ruas no Escuro',
    description: 'Postes de três bairros pararam de responder. Chamados de moradores aumentam a cada minuto.', liveData: '47 postes offline • 18 chamados abertos',
    decisions: [
      { id: 'remote-diagnosis', title: 'Diagnóstico remoto', description: 'Localizar falhas pelo painel antes de enviar as equipes.', investment: 1450000, technology: 'IoT + manutenção preditiva', effects: { safety: 17, wellbeing: 10, sustainability: 4, budget: -7 }, outcome: 'O painel identificou o transformador defeituoso e reduziu o tempo de reparo.' },
      { id: 'all-crews', title: 'Enviar todas as equipes', description: 'Fazer uma varredura manual completa nos três bairros.', investment: 3600000, technology: 'Operação de campo', effects: { safety: 13, wellbeing: 7, budget: -17 }, outcome: 'As luzes voltaram, mas o custo foi alto e outras manutenções ficaram sem equipe.' },
      { id: 'tomorrow-repair', title: 'Aguardar até amanhã', description: 'Realizar o reparo apenas no horário normal.', investment: 0, technology: 'Fila convencional', effects: { safety: -18, wellbeing: -12, budget: 3 }, outcome: 'A economia foi pequena diante do aumento de ocorrências e reclamações.' },
    ],
  },
  {
    id: 'waste-overflow', round: 3, category: 'LIMPEZA URBANA', alert: 'COLETA ATRASADA', title: 'Lixo Acumulado',
    description: 'Contêineres de dois bairros estão cheios e moradores já relatam mau cheiro perto da escola.', liveData: '82 contêineres lotados • 1.460 chamados',
    decisions: [
      { id: 'smart-routes', title: 'Criar rotas inteligentes', description: 'Priorizar os contêineres cheios usando sensores e localização da frota.', investment: 2100000, technology: 'Sensores + algoritmo de rotas', effects: { sustainability: 17, wellbeing: 13, mobility: 4, budget: -9 }, outcome: 'Os caminhões percorreram menos quilômetros e atenderam primeiro os pontos mais críticos.' },
      { id: 'emergency-cleanup', title: 'Contratar mutirão emergencial', description: 'Mobilizar equipes extras para limpar todos os bairros hoje.', investment: 3700000, technology: 'Central de operações', effects: { wellbeing: 15, safety: 5, sustainability: 6, budget: -16 }, outcome: 'As ruas ficaram limpas rapidamente, mas o contrato emergencial consumiu muitos recursos.' },
      { id: 'regular-schedule', title: 'Manter a coleta normal', description: 'Esperar o próximo dia previsto no calendário.', investment: 0, technology: 'Calendário convencional', effects: { wellbeing: -15, sustainability: -12, safety: -5, budget: 2 }, outcome: 'O acúmulo aumentou e surgiram novos pontos de descarte irregular.' },
    ],
  },
  {
    id: 'clinic-overload', round: 3, category: 'SAÚDE', alert: 'FILAS NAS UBS', title: 'Postos de Saúde Lotados',
    description: 'Três unidades básicas têm filas longas, enquanto outras duas ainda possuem horários disponíveis.', liveData: 'Espera média: 3h20 • 186 pessoas aguardando',
    decisions: [
      { id: 'digital-triage', title: 'Implantar triagem digital', description: 'Direcionar cada pessoa à unidade adequada e permitir agendamento pelo celular.', investment: 2400000, technology: 'Aplicativo + integração de dados', effects: { wellbeing: 19, mobility: 6, safety: 5, budget: -10 }, outcome: 'A distribuição entre as unidades melhorou e os casos urgentes foram identificados mais cedo.' },
      { id: 'temporary-team', title: 'Abrir equipe temporária', description: 'Contratar profissionais para ampliar o atendimento por 30 dias.', investment: 3950000, technology: 'Gestão de escalas', effects: { wellbeing: 17, safety: 8, budget: -17 }, outcome: 'As filas caíram, mas a solução terá de ser revista quando o contrato terminar.' },
      { id: 'publish-times', title: 'Publicar os tempos de espera', description: 'Informar as filas atuais sem alterar a capacidade de atendimento.', investment: 280000, technology: 'Painel de transparência', effects: { wellbeing: 3, mobility: 5, safety: -7, budget: -2 }, outcome: 'Algumas pessoas escolheram unidades mais vazias, porém a capacidade continuou insuficiente.' },
    ],
  },
  {
    id: 'storm-water', round: 4, category: 'MEIO AMBIENTE', alert: 'CHUVA INTENSA', title: 'Risco de Alagamento',
    description: 'Sensores indicam que o rio atingirá o nível crítico em 35 minutos. Dois bairros estão na rota da água.', liveData: 'Rio: 91% • Chuva: 48 mm/h • Solo saturado',
    decisions: [
      { id: 'smart-drainage', title: 'Ativar drenagem inteligente', description: 'Abrir reservatórios e alertar moradores das áreas de risco.', investment: 3800000, technology: 'Sensores + alertas + automação', effects: { safety: 20, wellbeing: 14, sustainability: 12, budget: -13 }, outcome: 'Reservatórios reduziram o pico da água e os alertas ajudaram moradores a se proteger.' },
      { id: 'close-bridges', title: 'Fechar pontes e avenidas', description: 'Bloquear preventivamente as áreas com maior risco.', investment: 780000, technology: 'Mapa de risco + painéis', effects: { safety: 14, mobility: -12, wellbeing: 4, budget: -6 }, outcome: 'Ninguém entrou nas áreas perigosas, mas a mobilidade da cidade foi afetada.' },
      { id: 'monitor-river', title: 'Somente monitorar', description: 'Aguardar confirmação visual antes de tomar medidas.', investment: 0, technology: 'Câmeras', effects: { safety: -22, wellbeing: -17, sustainability: -8, budget: 2 }, outcome: 'A reação começou tarde e vias importantes foram alagadas.' },
    ],
  },
  {
    id: 'air-quality', round: 4, category: 'SAÚDE', alert: 'AR INSALUBRE', title: 'Alerta de Poluição',
    description: 'Sensores registraram qualidade do ar ruim perto de escolas e hospitais.', liveData: 'Índice do ar: 168 • Vento fraco • 14 mil pessoas expostas',
    decisions: [
      { id: 'low-emission-zone', title: 'Criar zona de baixa emissão', description: 'Restringir veículos poluentes e reforçar ônibus elétricos.', investment: 3500000, technology: 'Sensores + câmeras + transporte elétrico', effects: { sustainability: 21, wellbeing: 15, mobility: -5, budget: -13 }, outcome: 'A emissão caiu gradualmente e grupos vulneráveis receberam orientação pelo aplicativo.' },
      { id: 'free-transit', title: 'Transporte público gratuito', description: 'Incentivar motoristas a deixarem o carro em casa hoje.', investment: 4000000, technology: 'Bilhetagem digital', effects: { sustainability: 14, mobility: 8, wellbeing: 10, budget: -18 }, outcome: 'Mais pessoas usaram ônibus, diminuindo veículos nas regiões críticas.' },
      { id: 'just-warning', title: 'Apenas publicar um aviso', description: 'Orientar a população sem alterar a mobilidade.', investment: 150000, technology: 'Aplicativo de alertas', effects: { wellbeing: -6, sustainability: -10, budget: 1 }, outcome: 'O aviso alcançou moradores, mas não reduziu a fonte da poluição.' },
    ],
  },
  {
    id: 'water-leak', round: 5, category: 'SANEAMENTO', alert: 'PERDA DE ÁGUA', title: 'Vazamento na Rede',
    description: 'A pressão caiu no bairro Norte. O sistema estima que milhares de litros estão sendo perdidos por hora.', liveData: 'Perda: 38 mil L/h • 620 casas afetadas',
    decisions: [
      { id: 'acoustic-sensors', title: 'Localizar com sensores acústicos', description: 'Encontrar o ponto exato antes de abrir o asfalto e enviar a equipe.', investment: 2750000, technology: 'IoT + análise acústica', effects: { sustainability: 20, wellbeing: 13, mobility: 4, budget: -11 }, outcome: 'O vazamento foi localizado com precisão e o reparo afetou apenas um pequeno trecho da via.' },
      { id: 'dig-avenue', title: 'Interditar e escavar a avenida', description: 'Procurar manualmente o vazamento ao longo de toda a tubulação.', investment: 3900000, technology: 'Obra emergencial', effects: { sustainability: 13, wellbeing: 8, mobility: -14, budget: -17 }, outcome: 'O vazamento foi reparado, mas a obra extensa bloqueou o bairro durante horas.' },
      { id: 'reduce-pressure', title: 'Reduzir a pressão da água', description: 'Diminuir temporariamente a perda e deixar o reparo para a semana seguinte.', investment: 180000, technology: 'Controle remoto de válvulas', effects: { sustainability: 4, wellbeing: -12, safety: -4, budget: -1 }, outcome: 'A perda diminuiu, porém muitas casas ficaram com abastecimento fraco.' },
    ],
  },
  {
    id: 'digital-inclusion', round: 5, category: 'INCLUSÃO', alert: 'BAIRRO DESCONECTADO', title: 'Acesso Digital Desigual',
    description: 'Estudantes de bairros afastados têm dificuldade para acessar serviços públicos e atividades escolares online.', liveData: '4.800 famílias sem conexão adequada • 7 escolas afetadas',
    decisions: [
      { id: 'public-wifi', title: 'Criar rede pública de internet', description: 'Instalar pontos de Wi-Fi em escolas, praças e unidades de saúde.', investment: 3300000, technology: 'Fibra óptica + Wi-Fi público', effects: { wellbeing: 19, safety: 5, mobility: 5, budget: -13 }, outcome: 'Famílias passaram a acessar estudo, trabalho e serviços municipais perto de casa.' },
      { id: 'device-loans', title: 'Emprestar tablets aos estudantes', description: 'Criar uma biblioteca de dispositivos nas escolas municipais.', investment: 2200000, technology: 'Plataforma de empréstimos', effects: { wellbeing: 15, sustainability: 3, budget: -9 }, outcome: 'Os estudantes receberam equipamentos, mas parte deles ainda depende de conexão fora da escola.' },
      { id: 'information-campaign', title: 'Divulgar pontos já existentes', description: 'Mapear locais gratuitos atuais sem ampliar a infraestrutura.', investment: 240000, technology: 'Mapa no aplicativo municipal', effects: { wellbeing: 5, mobility: -3, budget: -1 }, outcome: 'O mapa ajudou algumas famílias, mas muitos bairros continuaram sem acesso próximo.' },
    ],
  },
];
