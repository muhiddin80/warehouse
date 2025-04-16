import app from "./app.js";
import APP_PORT from "./config/app.config.js";
import connectMongo from "./config/mongo.config.js";

connectMongo();

app.listen(APP_PORT,()=>{
    console.log(`The server is running on port ${APP_PORT}`)
})