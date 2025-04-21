import { Router } from "express"
import goodsController from "./goods.controller.js";
import { ValidationMiddleware } from "../../middleware/validation.middleware.js";
import { goodsSchema } from "./dtos/goods.schema.js";
import { Protected } from "../../middleware/protected.middleware.js";
import { Roles } from "../../middleware/role.middleware.js";
import { ROLES } from "../../constants/roles.constants.js";
import { upload } from "../../config/multer.config.js";

const goodRouter = Router();

goodRouter
    .get("/",
        Protected(true),
        Roles(ROLES.OWNER,ROLES.SUPER_ADMIN,ROLES.WORKER),
        goodsController.getAllGoods)
    .post("/",
        Protected(true),
        Roles(ROLES.OWNER,ROLES.SUPER_ADMIN,ROLES.WORKER),
        upload.single("image"),
        ValidationMiddleware(goodsSchema),
        goodsController.createGoods)
    .put("/:id",
        Protected(true),
        Roles(ROLES.OWNER,ROLES.SUPER_ADMIN,ROLES.WORKER),
        ValidationMiddleware(goodsSchema),
        goodsController.updateGoods)
    .delete("/:id",
        Protected(true),
        Roles(ROLES.OWNER,ROLES.SUPER_ADMIN,ROLES.WORKER),
        goodsController.deleteGoods)

export default goodRouter;