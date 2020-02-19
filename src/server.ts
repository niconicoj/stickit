import app from "./app";
import getEnv from './lib/env';

getEnv();

app.start(process.env.APP_PORT || '4000');