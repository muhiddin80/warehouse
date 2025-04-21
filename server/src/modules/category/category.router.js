import { Router } from "express";
import categoryController from "./category.controller.js";
import { ValidationMiddleware } from "../../middleware/validation.middleware.js";
import { CategorySchema } from "./dtos/createcategory.schema.js";
import { Protected } from "../../middleware/protected.middleware.js";
import { Roles } from "../../middleware/role.middleware.js";
import { ROLES } from "../../constants/roles.constants.js";

const categoryRouter = Router();

categoryRouter.get("/",
    Protected(false),
    Roles(ROLES.ALL),
    categoryController.getAllCategory)
    .get("/:id",
        Protected(false),
        Roles(ROLES.ALL),
        categoryController.getCategory)
    .post("/",
        Protected(true),
        Roles(ROLES.OWNER,ROLES.SUPER_ADMIN,ROLES.WORKER),
        ValidationMiddleware(CategorySchema),
        categoryController.createCategory)
    .put("/:id",
        Protected(true),
        Roles(ROLES.OWNER,ROLES.SUPER_ADMIN,ROLES.WORKER),
        ValidationMiddleware(CategorySchema),
        categoryController.updateCategory)
    .delete("/:id",
        Protected(true),
        Roles(ROLES.OWNER,ROLES.SUPER_ADMIN,ROLES.WORKER),
        categoryController.deleteCategory);

export default categoryRouter;