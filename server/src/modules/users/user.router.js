import { Router } from "express";
import userController from "./user.controller.js";
import { ValidationMiddleware } from "../../middleware/validation.middleware.js";
import { registerUser } from "./dtos/usercreate.schema.js";
import { loginUser } from "./dtos/loginuser.schema.js";
import { updateUser } from "./dtos/userupdate.schmea.js";

const userRouter = Router();

userRouter.get("/",userController.getAllusers)
    .post("/register",
        ValidationMiddleware(registerUser),
        userController.register)
    .post("/login",
        ValidationMiddleware(loginUser),
        userController.login)
    .delete("/:id",userController.deleteUser)
    .put("/:id",
        ValidationMiddleware(updateUser),
        userController.updateUser);

export default userRouter;