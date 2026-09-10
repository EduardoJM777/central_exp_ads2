import { randomUUID } from 'node:crypto';
import type { DecisionHistory, Metrics, Scenario } from './domain.js';
import { scenarios } from './scenarios.js';

interface Session { id: string; nickname: string; scenarioIds: string[]; round: number; metrics: Metrics; score: number; treasury: number; startingTreasury: number; history: DecisionHistory[]; }
const sessions = new Map<string, Session>();
const TOTAL_ROUNDS = 5;
const STARTING_TREASURY = 20000000;
const RESERVE_TARGET = 4000000;

const clamp = (value: number) => Math.max(0, Math.min(100, value));
const pick = <T>(items: T[]) => items[Math.floor(Math.random() * items.length)];

export function createGame(nickname: string) {
  const selected = Array.from({ length: TOTAL_ROUNDS }, (_, index) => pick(scenarios.filter((scenario) => scenario.round === index + 1)));
  const session: Session = { id: randomUUID(), nickname, scenarioIds: selected.map(({ id }) => id), round: 0, metrics: { mobility: 62, sustainability: 58, safety: 65, wellbeing: 60, budget: 100 }, score: 0, treasury: STARTING_TREASURY, startingTreasury: STARTING_TREASURY, history: [] };
  sessions.set(session.id, session);
  return { sessionId: session.id, nickname, metrics: session.metrics, scenario: selected[0], round: 1, totalRounds: TOTAL_ROUNDS, treasury: session.treasury, startingTreasury: session.startingTreasury };
}

export function decide(sessionId: string, scenarioId: string, decisionId: string) {
  const session = sessions.get(sessionId);
  if (!session) throw new Error('SESSION_NOT_FOUND');
  const expectedId = session.scenarioIds[session.round];
  if (expectedId !== scenarioId) throw new Error('SCENARIO_NOT_CURRENT');
  const scenario = scenarios.find(({ id }) => id === scenarioId)!;
  const decision = scenario.decisions.find(({ id }) => id === decisionId);
  if (!decision) throw new Error('DECISION_NOT_FOUND');
  if (decision.investment > session.treasury) throw new Error('INSUFFICIENT_FUNDS');

  const before = { ...session.metrics };
  for (const [key, effect] of Object.entries(decision.effects)) {
    const metric = key as keyof Metrics;
    session.metrics[metric] = clamp(session.metrics[metric] + (effect ?? 0));
  }
  const positiveImpact = Object.values(decision.effects).filter((value) => value > 0).reduce((sum, value) => sum + value, 0);
  const negativeImpact = Math.abs(Object.values(decision.effects).filter((value) => value < 0).reduce((sum, value) => sum + value, 0));
  const roundScore = Math.max(20, 100 + positiveImpact - Math.floor(negativeImpact / 2));
  session.score += roundScore;
  session.treasury -= decision.investment;
  session.history.push({ round: scenario.round, scenario: scenario.title, decision: decision.title, investment: decision.investment, technology: decision.technology, outcome: decision.outcome });
  session.round += 1;
  const completed = session.round >= TOTAL_ROUNDS;
  const cityIndex = Math.round(Object.values(session.metrics).reduce((sum, value) => sum + value, 0) / 5);
  const reserveHealth = Math.min(100, Math.round(session.treasury / RESERVE_TARGET * 100));
  const fiscalBonus = completed ? Math.round(cityIndex * 0.6 + reserveHealth * 0.4) : 0;
  if (completed) session.score += fiscalBonus;
  const fiscalStatus = session.treasury < RESERVE_TARGET / 2 ? 'CAIXA CRÍTICO' : session.treasury < RESERVE_TARGET ? 'RESERVA EM ATENÇÃO' : session.treasury > 12000000 && cityIndex < 70 ? 'RECURSOS PARADOS' : cityIndex >= 75 ? 'GESTÃO EQUILIBRADA' : 'RESERVA GARANTIDA';
  const fiscalMessage = fiscalStatus === 'CAIXA CRÍTICO' ? 'A cidade terminou sem proteção suficiente para uma nova emergência.' : fiscalStatus === 'RESERVA EM ATENÇÃO' ? 'O saldo ajuda, mas ainda ficou abaixo da meta de segurança de R$ 4 milhões.' : fiscalStatus === 'RECURSOS PARADOS' ? 'O caixa está alto, porém parte desse dinheiro poderia ter melhorado os indicadores da cidade.' : 'O saldo foi destinado ao Fundo Municipal de Emergência e protege o próximo ano de gestão.';
  return { before, metrics: session.metrics, effects: decision.effects, outcome: decision.outcome, technology: decision.technology, roundScore, totalScore: session.score, completed, investment: decision.investment, treasury: session.treasury, totalInvestment: session.startingTreasury - session.treasury, history: [...session.history], reserveTarget: RESERVE_TARGET, fiscalBonus, fiscalStatus, fiscalMessage };
}

export function nextScenario(sessionId: string): Scenario | null {
  const session = sessions.get(sessionId);
  if (!session) throw new Error('SESSION_NOT_FOUND');
  return scenarios.find(({ id }) => id === session.scenarioIds[session.round]) ?? null;
}

export function getSession(sessionId: string) {
  const session = sessions.get(sessionId);
  if (!session) throw new Error('SESSION_NOT_FOUND');
  return session;
}
