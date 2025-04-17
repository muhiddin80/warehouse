import { config } from "dotenv"

config()

const APP_PORT = +process.env.APP_PORT;

export default APP_PORT;