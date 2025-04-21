import app from "./app.js";
import APP_PORT from "./config/app.config.js";
import connectMongo from "./config/mongo.config.js";

connectMongo();

app.listen(APP_PORT,()=>{
    console.log(`The server is running on port ${APP_PORT}`)
})

process.on("unhandledRejection",(reason,promise)=>{
    server.closeAllConnections();
    server.close(()=>{
        process.exit(1);
    })
})

process.on("uncaughtException",(err)=>{
    process.exit(1);
})