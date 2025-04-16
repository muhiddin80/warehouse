import express, { json } from "express";
import userRouter from "./modules/users/user.router";


const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/",userRouter);

app.all("/*splat",(req,res)=>{
    res.status(400).send({
        message:"Invalid url!"
    })
})

export default app;