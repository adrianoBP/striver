import dotenv from 'dotenv';
import startServer from './app.js';
import fs from 'fs';
import https from 'https';

dotenv.config();

const PORT = process.env.PORT ?? 5000;
const IS_PROD = process.env.IS_PROD === 'true';
const CLIENT_FOLDER = 'client/build';

const app = startServer(IS_PROD, CLIENT_FOLDER);

if (IS_PROD) {
  const options = {
    key: fs.readFileSync(process.env.SSL_KEY),
    cert: fs.readFileSync(process.env.SSL_CERT),
  };

  https.createServer(options, app).listen(PORT, () => {
    console.log(`Server listening on PORT ${PORT}`);
  });
} else {
  app.listen(PORT, () => {
    console.log(`Server listening on PORT ${PORT}`);
  });
}
