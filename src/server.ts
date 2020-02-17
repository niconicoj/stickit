import app from "./app";
import getEnv from './lib/env';

app.listen(process.env.APP_PORT, () => console.log(`Listening on port ${process.env.APP_PORT}`));