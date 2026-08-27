import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import { config } from './config.js';
import { apiRouter } from './routes/api.js';

export const app = express();

app.disable('x-powered-by');
app.use(helmet());
app.use(cors({ origin: config.allowedOrigin }));
app.use(express.json({ limit: '20kb' }));
app.use('/api', apiRouter);
app.use((_request, response) => response.status(404).json({ message: 'Rota não encontrada.' }));
