import { resolve } from "path"

import { config } from "dotenv"

const getEnv = () => {
  return config({ path: resolve(__dirname, "../../.env") })
}

getEnv();

export const {
  APP_PORT,
  MONGO_HOST,
  MONGO_PORT,
  MONGO_DB,
  MONGO_USER,
  MONGO_PASSWORD,
  G_SIGN_IN_CLIENT_ID
} = <{ [key: string]: string }>process.env