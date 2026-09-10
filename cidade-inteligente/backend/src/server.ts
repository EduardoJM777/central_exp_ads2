import { app } from './app.js';
const port = Number(process.env.PORT ?? 3334);
app.listen(port, '0.0.0.0', () => console.log(`Cidade Inteligente API ativa em http://localhost:${port}`));
