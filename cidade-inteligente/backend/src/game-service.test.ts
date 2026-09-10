import assert from 'node:assert/strict';
import test from 'node:test';
import { createGame, decide, nextScenario } from './game-service.js';

test('cria cinco rodadas progressivas com orçamento real', () => {
  const game = createGame('Prefeito Teste');
  assert.equal(game.scenario.round, 1);
  assert.equal(game.totalRounds, 5);
  assert.equal(game.treasury, 20000000);
});

test('aplica uma decisão e avança de rodada', () => {
  const game = createGame('Prefeito Teste');
  const option = game.scenario.decisions[0];
  const result = decide(game.sessionId, game.scenario.id, option.id);
  assert.ok(result.roundScore > 0);
  assert.equal(result.treasury, 20000000 - option.investment);
  assert.equal(result.history.length, 1);
  assert.equal(result.completed, false);
  assert.equal(nextScenario(game.sessionId)?.round, 2);
});

test('transforma o saldo final em reserva e bônus fiscal', () => {
  const game = createGame('Gestor Fiscal');
  let scenario = game.scenario;
  let result = decide(game.sessionId, scenario.id, scenario.decisions[0].id);
  while (!result.completed) {
    scenario = nextScenario(game.sessionId)!;
    result = decide(game.sessionId, scenario.id, scenario.decisions[0].id);
  }
  assert.equal(result.reserveTarget, 4000000);
  assert.ok(result.fiscalBonus > 0);
  assert.match(result.fiscalMessage, /Fundo Municipal|cidade terminou|meta de segurança|dinheiro/);
});
