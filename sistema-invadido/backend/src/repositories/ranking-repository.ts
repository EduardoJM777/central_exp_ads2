import fs from 'node:fs';
import path from 'node:path';
import { DatabaseSync } from 'node:sqlite';
import { config } from '../config.js';

fs.mkdirSync(path.dirname(config.databasePath), { recursive: true });
const database = new DatabaseSync(config.databasePath);

database.exec(`
  CREATE TABLE IF NOT EXISTS ranking (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nickname TEXT NOT NULL,
    score INTEGER NOT NULL,
    correct_answers INTEGER NOT NULL,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  );
`);

export function saveRanking(nickname: string, score: number, correctAnswers: number): void {
  database.prepare('INSERT INTO ranking (nickname, score, correct_answers) VALUES (?, ?, ?)')
    .run(nickname, score, correctAnswers);
}

export function listRanking(limit = 10) {
  return database.prepare(`
    SELECT id, nickname, score, correct_answers AS correctAnswers, created_at AS createdAt
    FROM ranking ORDER BY score DESC, created_at ASC LIMIT ?
  `).all(limit);
}

export function countParticipants(): number {
  const row = database.prepare('SELECT COUNT(*) AS total FROM ranking').get() as { total: number };
  return row.total;
}
