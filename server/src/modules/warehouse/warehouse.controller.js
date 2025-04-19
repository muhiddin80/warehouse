import warehouseService from "./warehouse.service"


class WarehouseController{
    #_warehouseService
    constructor(){
        this.#_warehouseService = warehouseService
    };
    getAllWarehouses = async (req,res,next) => {
        try {
            const data = await this.#_warehouseService.getAllWarehouses();
            res.send(data)
        } catch (error) {
            next(error)
        }
    }

    getWarehouse = async (req,res,next) => {
        try {
            const id = req.params.id;
            const data = await this.#_warehouseService.getWarehouse(id);
            res.send(data)
        } catch (error) {
            next(error)  
        }
    }

    createWarehouse = async (req,res,next) => {
        try {
            const {name,type,owner} = req.body;
            const data = await this.#_warehouseService.createWarehouse(name,type,owner);
            res.send(data)
        } catch (error) {
            next(error)  
        }
    }

    updateWarehouse = async (req,res,next) => {
        try {
            const id = req.params.id;
            const {name,type,owner} = req.body;
            const data = await this.#_warehouseService.updateWarehouse(id,name,type,owner);
            res.send(data)
        } catch (error) {
            next(error)
        }
    }

    deleteWarehouse = async (req,res,next) => {
        try {
            const id = req.params.id;
            const data = await this.#_warehouseService.deleteWarehouse(id);
            res.send(data)
        } catch (error) {
            next(error)
        }
    }
}

export default new WarehouseController();