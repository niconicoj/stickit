import { resolve } from "path"

import { config } from "dotenv"

const getEnv = () => {
  return config({ path: resolve(__dirname, "../../.env") })
}
export default getEnv;