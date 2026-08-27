import assert from 'node:assert/strict';
import test from 'node:test';
import { challenges } from '../data/challenges.js';
import { answerChallenge, createSession, getNextChallenge } from './game-service.js';

test('não entrega a resposta no desafio público', () => {
  const session = createSession('Tester');
  assert.equal('answer' in session.challenge, false);
});

test('inicia sempre pelo nível mais fácil', () => {
  const session = createSession('Tester');
  assert.match(session.challenge.level, /^NÍVEL 1/);
});

test('resposta errada não pontua', () => {
  const session = createSession('Tester');
  const result = answerChallenge(session.sessionId, session.challenge.id, 'resposta certamente errada', 10, 1);
  assert.equal(result.correct, false);
  assert.equal(result.scoreEarned, 0);
  assert.equal(result.attemptsRemaining, 2);
});

test('resposta correta pontua sem expor a chave ao cliente', () => {
  const session = createSession('Tester');
  const privateChallenge = challenges.find(({ id }) => id === session.challenge.id)!;
  const result = answerChallenge(session.sessionId, session.challenge.id, privateChallenge.answer, 8, 1);
  assert.equal(result.correct, true);
  assert.ok(result.scoreEarned >= 100);
  assert.equal(result.correctAnswers, 1);
});

test('a dificuldade sobe do nível 1 até o desafio final', () => {
  const session = createSession('Progressivo');
  const expectedLevels = ['NÍVEL 1', 'NÍVEL 2', 'NÍVEL 3'];

  for (const expectedLevel of expectedLevels) {
    const publicChallenge = getNextChallenge(session.sessionId)!;
    assert.match(publicChallenge.level, new RegExp(`^${expectedLevel}`));
    const privateChallenge = challenges.find(({ id }) => id === publicChallenge.id)!;
    answerChallenge(session.sessionId, publicChallenge.id, privateChallenge.answer, 10, 1);
  }

  assert.equal(getNextChallenge(session.sessionId), null);
});
