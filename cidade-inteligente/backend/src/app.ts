import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import { z } from 'zod';
import { createGame, decide, getSession, nextScenario } from './game-service.js';
import { listRanking, participantCount, saveResult } from './ranking.js';

export const app = express();
app.disable('x-powered-by');
app.use(helmet());
app.use(cors({ origin: process.env.FRONTEND_URL ?? 'http://localhost:4201' }));
app.use(express.json({ limit: '20kb' }));

app.get('/api/health', (_request, response) => response.json({ status: 'ok', node: process.version }));
app.get('/api/ranking', (_request, response) => response.json({ ranking: listRanking(), participants: participantCount() }));
app.post('/api/sessions', (request, response) => {
  const parsed = z.object({ nickname: z.string().trim().min(2).max(18).regex(/^[\p{L}\p{N} _.-]+$/u) }).safeParse(request.body);
  if (!parsed.success) return response.status(400).json({ message: 'Use um apelido de 2 a 18 caracteres.' });
  return response.status(201).json(createGame(parsed.data.nickname));
});
app.post('/api/sessions/:id/decisions', (request, response) => {
  const parsed = z.object({ scenarioId: z.string(), decisionId: z.string() }).safeParse(request.body);
  if (!parsed.success) return response.status(400).json({ message: 'Decisão inválida.' });
  try {
    const result = decide(request.params['id'], parsed.data.scenarioId, parsed.data.decisionId);
    if (result.completed) {
      const session = getSession(request.params['id']);
      const cityIndex = Math.round(Object.values(session.metrics).reduce((sum, value) => sum + value, 0) / 5);
      saveResult(session.nickname, session.score, cityIndex);
      return response.json({ ...result, cityIndex });
    }
    return response.json(result);
  } catch { return response.status(404).json({ message: 'Sessão, cenário ou decisão não encontrado.' }); }
});
app.get('/api/sessions/:id/next', (request, response) => {
  try { return response.json({ scenario: nextScenario(request.params['id']) }); }
  catch { return response.status(404).json({ message: 'Sessão não encontrada.' }); }
});
app.use((_request, response) => response.status(404).json({ message: 'Rota não encontrada.' }));
