import { Router } from "express";
import userController from "./user.controller.js";
import { ValidationMiddleware } from "../../middleware/validation.middleware.js";
import { registerUser } from "./dtos/usercreate.schema.js";
import { loginUser } from "./dtos/loginuser.schema.js";
import { updateUser } from "./dtos/userupdate.schema.js";
import { Protected } from "../../middleware/protected.middleware.js";
import { Roles } from "../../middleware/role.middleware.js";
import { ROLES } from "../../constants/roles.constants.js";
import { forgotPasswordSchema, refreshPasswordSchema } from "./dtos/refreshpassword.schema.js";

const userRouter = Router();

userRouter.get("/",
    Protected(true),
    Roles(ROLES.SUPER_ADMIN),
    userController.getAllusers)
    .post("/register",
        Protected(false),
        Roles(ROLES.ALL),
        ValidationMiddleware(registerUser),
        userController.register)
    .post("/login",
        Protected(false),
        Roles(ROLES.ALL),
        ValidationMiddleware(loginUser),
        userController.login)
    .delete("/:id",
        Protected(true),
        Roles(ROLES.SUPER_ADMIN,ROLES.OWNER),
        userController.deleteUser)
    .put("/:id",
        Protected(true),
        Roles(ROLES.SUPER_ADMIN,ROLES.OWNER,ROLES),
        ValidationMiddleware(updateUser),
        userController.updateUser)
    .post("/forgotpassword",
        Protected(false),
        Roles(ROLES.ALL),
        ValidationMiddleware(forgotPasswordSchema),
        userController.forgotPasswod
    )
    .post("/resetpassword",
        Protected(false),
        Roles(ROLES.ALL),
        ValidationMiddleware(refreshPasswordSchema),
        userController.resetPassword
    );

export default userRouter;