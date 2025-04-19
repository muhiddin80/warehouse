import { Router } from "express";
import warehouseController from "./warehouse.controller.js";
import { ValidationMiddleware } from "../../middleware/validation.middleware.js";
import { warehouseSchema } from "./dtos/warehouse.schema.js";

const warehouseRouter = Router();

warehouseRouter
    .get("/",warehouseController.getAllWarehouses)
    .get("/:id",warehouseController.getWarehouse)
    .post("/",
        ValidationMiddleware(warehouseSchema),
        warehouseController.createWarehouse)
    .delete("/:id",warehouseController.deleteWarehouse)
    .put("/:id",
        ValidationMiddleware(warehouseSchema),
        warehouseController.updateWarehouse);

export default warehouseRouter;