import dotenv from 'dotenv';
import startServer from './app.js';

dotenv.config();

const PORT = process.env.PORT ?? 5000;
const IS_PROD = process.env.IS_PROD === 'true';
const CLIENT_FOLDER = new URL('client/build', import.meta.url).pathname;

startServer(IS_PROD, CLIENT_FOLDER)
  .listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
