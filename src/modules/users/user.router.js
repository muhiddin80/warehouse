import { Router } from "express";
import userController from "./user.controller.js";

const userRouter = Router();

userRouter.get("/users",userController.getAllusers)
    .post("/users/register",userController.register)

export default userRouter;