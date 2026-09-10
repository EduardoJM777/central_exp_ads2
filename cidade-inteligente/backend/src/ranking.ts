import fs from 'node:fs';
import path from 'node:path';
import { DatabaseSync } from 'node:sqlite';
import { fileURLToPath } from 'node:url';

const directory = path.dirname(fileURLToPath(import.meta.url));
const databasePath = process.env.DATABASE_PATH ?? path.resolve(directory, '..', 'data', 'city-ranking.db');
fs.mkdirSync(path.dirname(databasePath), { recursive: true });
const database = new DatabaseSync(databasePath);
database.exec(`CREATE TABLE IF NOT EXISTS ranking (id INTEGER PRIMARY KEY AUTOINCREMENT, nickname TEXT NOT NULL, score INTEGER NOT NULL, city_index INTEGER NOT NULL, created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP)`);

export function saveResult(nickname: string, score: number, cityIndex: number) {
  database.prepare('INSERT INTO ranking (nickname, score, city_index) VALUES (?, ?, ?)').run(nickname, score, cityIndex);
}
export function listRanking(limit = 10) {
  return database.prepare('SELECT id, nickname, score, city_index AS cityIndex, created_at AS createdAt FROM ranking ORDER BY score DESC, city_index DESC, created_at ASC LIMIT ?').all(limit);
}
export function participantCount() {
  return (database.prepare('SELECT COUNT(*) AS total FROM ranking').get() as { total: number }).total;
}
