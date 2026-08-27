export interface Challenge {
  id: string;
  title: string;
  level: 'NÍVEL 1 — INICIANTE' | 'NÍVEL 2 — INVESTIGADOR' | 'NÍVEL 3 — DESAFIO FINAL';
  briefing: string;
  prompt: string;
  clues: string[];
  options: string[];
  answer: string;
  answerHint: string;
  explanation: string;
  timeLimitSeconds: number;
}

export interface PublicChallenge extends Omit<Challenge, 'answer'> {}
