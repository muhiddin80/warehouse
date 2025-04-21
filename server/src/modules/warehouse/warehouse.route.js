import { Router } from "express";
import warehouseController from "./warehouse.controller.js";
import { ValidationMiddleware } from "../../middleware/validation.middleware.js";
import { warehouseSchema } from "./dtos/warehouse.schema.js";
import { Protected } from "../../middleware/protected.middleware.js";
import { Roles } from "../../middleware/role.middleware.js";
import { ROLES } from "../../constants/roles.constants.js";

const warehouseRouter = Router();

warehouseRouter
    .get("/",
        Protected(true),
        Roles(ROLES.SUPER_ADMIN),
        warehouseController.getAllWarehouses)
    .get("/:id",
        Protected(true),
        Roles(ROLES.SUPER_ADMIN),
        warehouseController.getWarehouse)
    .post("/",
        Protected(true),
        Roles(ROLES.SUPER_ADMIN),
        ValidationMiddleware(warehouseSchema),
        warehouseController.createWarehouse)
    .delete("/:id",
        Protected(true),
        Roles(ROLES.SUPER_ADMIN),
        warehouseController.deleteWarehouse)
    .put("/:id",
        Protected(true),
        Roles(ROLES.SUPER_ADMIN),
        ValidationMiddleware(warehouseSchema),
        warehouseController.updateWarehouse);

export default warehouseRouter;