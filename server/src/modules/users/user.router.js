import { Router } from "express";
import userController from "./user.controller.js";
import { ValidationMiddleware } from "../../middleware/validation.middleware.js";
import { registerUser } from "./dtos/usercreate.schema.js";
import { loginUser } from "./dtos/loginuser.schema.js";
import { updateUser } from "./dtos/userupdate.schema.js";
import { Protected } from "../../middleware/protected.middleware.js";

const userRouter = Router();

userRouter.get("/",
    Protected(true),
    userController.getAllusers)
    .post("/register",
        Protected(false),
        ValidationMiddleware(registerUser),
        userController.register)
    .post("/login",
        Protected(false),
        ValidationMiddleware(loginUser),
        userController.login)
    .delete("/:id",
        Protected(true),
        userController.deleteUser)
    .put("/:id",
        Protected(true),
        ValidationMiddleware(updateUser),
        userController.updateUser)
    .post("/forgotpassword",
        userController.forgotPasswod
    )
    .post("/resetpassword",
        userController.resetPassword
    );

export default userRouter;