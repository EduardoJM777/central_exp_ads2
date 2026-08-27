export interface Challenge {
  id: string;
  title: string;
  level: 'NÍVEL 1 — INICIANTE' | 'NÍVEL 2 — INVESTIGADOR' | 'NÍVEL 3 — DESAFIO FINAL';
  briefing: string;
  prompt: string;
  clues: string[];
  options: string[];
  answerHint: string;
  explanation: string;
  timeLimitSeconds: number;
}

export interface GameSession {
  sessionId: string;
  nickname: string;
  totalChallenges: number;
  challenge: Challenge;
}

export interface AnswerResult {
  correct: boolean;
  scoreEarned: number;
  totalScore: number;
  explanation?: string;
  attemptsRemaining: number;
  completed: boolean;
  correctAnswers: number;
}

export interface RankingEntry {
  id: number;
  nickname: string;
  score: number;
  correctAnswers: number;
  createdAt: string;
}

export interface RankingResponse {
  ranking: RankingEntry[];
  participants: number;
}
