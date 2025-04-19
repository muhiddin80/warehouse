import { Router } from "express"
import goodsController from "./goods.controller.js";
import { ValidationMiddleware } from "../../middleware/validation.middleware.js";
import { goodsSchema } from "./dtos/goods.schema.js";

const goodRouter = Router();

goodRouter
    .get("/",goodsController.getAllGoods)
    .post("/",
        ValidationMiddleware(goodsSchema),
        goodsController.createGoods)
    .put("/:id",
        ValidationMiddleware(goodsSchema),
        goodsController.updateGoods)
    .delete("/:id",goodsController.deleteGoods)

export default goodRouter;