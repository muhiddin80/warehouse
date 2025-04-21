import warehouseService from "./warehouse.service.js"
import { isValidObjectId } from "mongoose";
import { BaseException } from "../../exception/base.exception.js";


class WarehouseController{
    #_warehouseService
    constructor(){
        this.#_warehouseService = warehouseService
    };
    getAllWarehouses = async (req,res,next) => {
        try {
            const data = await this.#_warehouseService.getAllWarehouses();
            res.status(200).send({
                message:"success",
                data:data
            })
        } catch (error) {
            next(error)
        }
    }

    getWarehouse = async (req,res,next) => {
        try {
            const id = req.params.id;
            
            if (!(isValidObjectId(id))) {
                throw new BaseException(`given id: ${id} is not valid`,400)
            }

            const data = await this.#_warehouseService.getWarehouse(id);
            res.status(200).send({
                message:"success",
                data:data
            })
        } catch (error) {
            next(error)  
        }
    }

    createWarehouse = async (req,res,next) => {
        try {
            const {name,type,owner,category} = req.body;
            const data = await this.#_warehouseService.createWarehouse(name,type,owner,category);
            if(data.error){
                throw new BaseException(data.error,data.status);
            }
            res.status(200).send({
                message:"Successfully created!",
                data:data
            })
        } catch (error) {
            next(error)  
        }
    }

    updateWarehouse = async (req,res,next) => {
        try {
            const id = req.params.id;
            
            if (!(isValidObjectId(id))) {
                throw new BaseException(`given id: ${id} is not valid`,400)
            }

            const {name,type,owner,category} = req.body;
            const data = await this.#_warehouseService.updateWarehouse(id,name,type,owner);
            if(data.error){
                throw new BaseException(data.error,data.status);
            }
            res.status(200).send({
                message:"Successfully updated!",
                data:data
            })
        } catch (error) {
            next(error)
        }
    }

    deleteWarehouse = async (req,res,next) => {
        try {
            const id = req.params.id;
            
            if (!(isValidObjectId(id))) {
                throw new BaseException(`given id: ${id} is not valid`,400)
            }

            const data = await this.#_warehouseService.deleteWarehouse(id);
            if(data.error){
                throw new BaseException(data.error,data.status);
            }
            res.status(200).send({
                message:"Successfully deleted!",
                data:data
            })
        } catch (error) {
            next(error)
        }
    }
}

export default new WarehouseController();