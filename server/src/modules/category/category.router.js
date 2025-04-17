import { Router } from "express";
import categoryController from "./category.controller.js";
import { ValidationMiddleware } from "../../middleware/validation.middleware.js";
import { CategorySchema } from "./dtos/createcategory.schema.js";

const categoryRouter = Router();

categoryRouter.get("/",categoryController.getAllCategory)
    .get("/:id",categoryController.getCategory)
    .post("/",
        ValidationMiddleware(CategorySchema),
        categoryController.createCategory)
    .put("/:id",
        ValidationMiddleware(CategorySchema),
        categoryController.updateCategory)
    .delete("/:id",categoryController.deleteCategory);

export default categoryRouter;