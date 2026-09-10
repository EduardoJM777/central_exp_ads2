import fs from 'node:fs';
import path from 'node:path';
import { DatabaseSync } from 'node:sqlite';
import { config } from '../config.js';

const databasePath = config.databasePath;
fs.mkdirSync(path.dirname(databasePath), { recursive: true });
const database = new DatabaseSync(databasePath);
database.exec(`CREATE TABLE IF NOT EXISTS city_ranking (id INTEGER PRIMARY KEY AUTOINCREMENT, nickname TEXT NOT NULL, score INTEGER NOT NULL, city_index INTEGER NOT NULL, created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP)`);

export function saveResult(nickname: string, score: number, cityIndex: number) {
  database.prepare('INSERT INTO city_ranking (nickname, score, city_index) VALUES (?, ?, ?)').run(nickname, score, cityIndex);
}
export function listRanking(limit = 10) {
  return database.prepare('SELECT id, nickname, score, city_index AS cityIndex, created_at AS createdAt FROM city_ranking ORDER BY score DESC, city_index DESC, created_at ASC LIMIT ?').all(limit);
}
export function participantCount() {
  return (database.prepare('SELECT COUNT(*) AS total FROM city_ranking').get() as { total: number }).total;
}
