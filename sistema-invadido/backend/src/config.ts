import path from 'node:path';
import { fileURLToPath } from 'node:url';

const currentDirectory = path.dirname(fileURLToPath(import.meta.url));

export const config = {
  port: Number(process.env.PORT ?? 3333),
  allowedOrigin: process.env.FRONTEND_URL ?? 'http://localhost:4200',
  databasePath: process.env.DATABASE_PATH ?? path.resolve(currentDirectory, '..', 'data', 'ranking.db'),
};
