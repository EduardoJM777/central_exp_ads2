import { randomUUID } from 'node:crypto';
import { challenges } from '../data/challenges.js';
import type { Challenge, PublicChallenge } from '../domain/challenge.js';

interface Session {
  id: string;
  nickname: string;
  challengeIds: string[];
  currentIndex: number;
  score: number;
  correctAnswers: number;
  createdAt: number;
  attempts: Map<string, number>;
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

const sessions = new Map<string, Session>();

const normalize = (value: string) => value.trim().normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase();

function pickOne<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

function publicChallenge(challenge: Challenge): PublicChallenge {
  const { answer: _answer, ...safeChallenge } = challenge;
  return safeChallenge;
}

export function createSession(nickname: string) {
  const selected = [
    pickOne(challenges.filter(({ level }) => level.startsWith('NÍVEL 1'))),
    pickOne(challenges.filter(({ level }) => level.startsWith('NÍVEL 2'))),
    pickOne(challenges.filter(({ level }) => level.startsWith('NÍVEL 3'))),
  ];
  const session: Session = {
    id: randomUUID(), nickname, challengeIds: selected.map(({ id }) => id), currentIndex: 0,
    score: 0, correctAnswers: 0, createdAt: Date.now(), attempts: new Map(),
  };
  sessions.set(session.id, session);
  return { sessionId: session.id, nickname, totalChallenges: selected.length, challenge: publicChallenge(selected[0]) };
}

export function answerChallenge(sessionId: string, challengeId: string, answer: string, elapsedSeconds: number, hintsUsed: number): AnswerResult {
  const session = sessions.get(sessionId);
  if (!session) throw new Error('SESSION_NOT_FOUND');
  const expectedId = session.challengeIds[session.currentIndex];
  if (expectedId !== challengeId) throw new Error('CHALLENGE_NOT_CURRENT');
  const challenge = challenges.find(({ id }) => id === challengeId)!;
  const attempts = (session.attempts.get(challengeId) ?? 0) + 1;
  session.attempts.set(challengeId, attempts);
  const correct = normalize(answer) === normalize(challenge.answer);

  if (!correct) {
    return { correct: false, scoreEarned: 0, totalScore: session.score, attemptsRemaining: Math.max(0, 3 - attempts), completed: false, correctAnswers: session.correctAnswers };
  }

  const speedBonus = Math.max(0, 50 - Math.floor(elapsedSeconds / 2));
  const scoreEarned = Math.max(50, 100 + speedBonus - Math.max(0, hintsUsed - 1) * 15 - Math.max(0, attempts - 1) * 10);
  session.score += scoreEarned;
  session.correctAnswers += 1;
  session.currentIndex += 1;
  return {
    correct: true, scoreEarned, totalScore: session.score, explanation: challenge.explanation,
    attemptsRemaining: 3 - attempts, completed: session.currentIndex >= session.challengeIds.length,
    correctAnswers: session.correctAnswers,
  };
}

export function skipChallenge(sessionId: string, challengeId: string) {
  const session = sessions.get(sessionId);
  if (!session) throw new Error('SESSION_NOT_FOUND');
  if (session.challengeIds[session.currentIndex] !== challengeId) throw new Error('CHALLENGE_NOT_CURRENT');
  session.currentIndex += 1;
  return { completed: session.currentIndex >= session.challengeIds.length, totalScore: session.score, correctAnswers: session.correctAnswers };
}

export function getNextChallenge(sessionId: string): PublicChallenge | null {
  const session = sessions.get(sessionId);
  if (!session) throw new Error('SESSION_NOT_FOUND');
  const challengeId = session.challengeIds[session.currentIndex];
  const challenge = challenges.find(({ id }) => id === challengeId);
  return challenge ? publicChallenge(challenge) : null;
}

export function getSession(sessionId: string) {
  const session = sessions.get(sessionId);
  if (!session) throw new Error('SESSION_NOT_FOUND');
  return session;
}
