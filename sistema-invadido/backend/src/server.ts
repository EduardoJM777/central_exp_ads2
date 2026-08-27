import { app } from './app.js';
import { config } from './config.js';

app.listen(config.port, () => {
  console.log(`Sistema Invadido API ativa em http://localhost:${config.port}`);
});
