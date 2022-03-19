import express from 'express';
import router from './controllers/index.js';

export default function startServer(isProd, clientFolder) {
  const app = express();
  app.use(express.json());
  app.use('/api', router);

  if (isProd) {
    if (clientFolder) app.use(express.static(clientFolder));
  }

  return app;
}
