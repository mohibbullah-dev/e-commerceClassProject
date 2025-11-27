import { app } from './src/app.js';
import { PORT } from './src/constant.js';
import DB_Connection from './src/db/index.js';

const serverStart = async () => {
  try {
    await DB_Connection();
    app.listen(PORT || 8000, () => {
      console.log(
        `server is running on the port ${PORT} http://localhost:8000/`,
      );
    });
  } catch (error) {
    console.log(`serverStart error ${error}`);
    process.exit(1);
  }
};

serverStart();
