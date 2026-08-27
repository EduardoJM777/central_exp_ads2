import { Router } from 'express';
import { z } from 'zod';
import { countParticipants, listRanking, saveRanking } from '../repositories/ranking-repository.js';
import { answerChallenge, createSession, getNextChallenge, getSession, skipChallenge } from '../services/game-service.js';

export const apiRouter = Router();

const nicknameSchema = z.object({ nickname: z.string().trim().min(2).max(18).regex(/^[\p{L}\p{N} _.-]+$/u) });
const answerSchema = z.object({ challengeId: z.string().min(1), answer: z.string().trim().min(1).max(40), elapsedSeconds: z.number().min(0).max(180), hintsUsed: z.number().int().min(1).max(3) });

apiRouter.get('/health', (_request, response) => response.json({ status: 'ok', node: process.version }));

apiRouter.get('/ranking', (request, response) => {
  const limit = Math.min(20, Math.max(1, Number(request.query['limit']) || 10));
  response.json({ ranking: listRanking(limit), participants: countParticipants() });
});

apiRouter.post('/sessions', (request, response) => {
  const parsed = nicknameSchema.safeParse(request.body);
  if (!parsed.success) return response.status(400).json({ message: 'Use um apelido de 2 a 18 caracteres.' });
  return response.status(201).json(createSession(parsed.data.nickname));
});

apiRouter.post('/sessions/:sessionId/answer', (request, response) => {
  const parsed = answerSchema.safeParse(request.body);
  if (!parsed.success) return response.status(400).json({ message: 'Resposta inválida.' });
  try {
    const result = answerChallenge(request.params['sessionId'], parsed.data.challengeId, parsed.data.answer, parsed.data.elapsedSeconds, parsed.data.hintsUsed);
    if (result.completed) {
      const session = getSession(request.params['sessionId']);
      saveRanking(session.nickname, session.score, session.correctAnswers);
    }
    return response.json(result);
  } catch {
    return response.status(404).json({ message: 'Sessão ou desafio não encontrado.' });
  }
});

apiRouter.post('/sessions/:sessionId/skip', (request, response) => {
  const challengeId = z.object({ challengeId: z.string() }).safeParse(request.body);
  if (!challengeId.success) return response.status(400).json({ message: 'Desafio inválido.' });
  try {
    const result = skipChallenge(request.params['sessionId'], challengeId.data.challengeId);
    if (result.completed) {
      const session = getSession(request.params['sessionId']);
      saveRanking(session.nickname, session.score, session.correctAnswers);
    }
    return response.json(result);
  } catch {
    return response.status(404).json({ message: 'Sessão ou desafio não encontrado.' });
  }
});

apiRouter.get('/sessions/:sessionId/next', (request, response) => {
  try {
    return response.json({ challenge: getNextChallenge(request.params['sessionId']) });
  } catch {
    return response.status(404).json({ message: 'Sessão não encontrada.' });
  }
});
