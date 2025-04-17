import express from "express";
import userRouter from "./modules/users/user.router.js";
import { ErrorHandlerMiddleware } from "./middleware/error-handling.middleware.js";
import categoryRouter from "./modules/category/category.router.js";


const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/user",userRouter);
app.use("/category",categoryRouter)

app.all("/*splat",(req,res)=>{
    res.status(400).send({
        message:"Invalid url!"
    })
})

app.use(ErrorHandlerMiddleware)

export default app;