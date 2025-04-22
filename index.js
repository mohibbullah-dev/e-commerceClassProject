import { app } from './src/app.js';
import { PORT } from './src/constant.js';

app.listen(PORT, () => {
  console.log(
    `server is running on the port ${PORT} http://localhost:8000/hello`,
  );
});
