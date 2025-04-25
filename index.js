import { app } from './src/app.js';
import { PORT } from './src/constant.js';
import DB_Connection from './src/db/index.js';

const serverStart = async () => {
  try {
    await DB_Connection();
    app.listen(PORT, () => {
      console.log(
        `server is running on the port ${PORT} http://localhost:8000/hello`,
      );
    });
  } catch (error) {
    console.log(`serverStart errpr ${error}`);
  }
};

serverStart();
