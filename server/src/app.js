import express from "express";
import userRouter from "./modules/users/user.router.js";
import { ErrorHandlerMiddleware } from "./middleware/error-handling.middleware.js";
import categoryRouter from "./modules/category/category.router.js";
import cookieParser from "cookie-parser"
import cors from "cors"
import goodRouter from "./modules/goods/goods.router.js";
import warehouseRouter from "./modules/warehouse/warehouse.route.js";
import {join} from "path"

const app = express();

app.use(cookieParser())

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/uploads", express.static(join(process.cwd(), "uploads")));

app.use(
    cors({
      origin: "*",
    })
  );

app.use("/user",userRouter);
app.use("/category",categoryRouter)
app.use("/goods",goodRouter)
app.use("/warehouse",warehouseRouter)

app.all("/*splat",(req,res)=>{
    res.status(400).send({
        message:"Invalid url!"
    })
})

app.use(ErrorHandlerMiddleware)

export default app;