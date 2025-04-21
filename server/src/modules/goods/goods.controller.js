import { isValidObjectId } from "mongoose";
import { BaseException } from "../../exception/base.exception.js";
import goodsService from "./goods.service.js"

class GoodsController{
    #_goodService
    constructor(){
        this.#_goodService = goodsService
    }

    getAllGoods = async (req,res,next) => {
        try {
            const { limit = 10, page = 1, orderField = "_id", orderSort = 1, search } = req.query;

            if (!(Number(limit) && Number(page))) {
                return res.status(400).send({
                message: "Limit and page must be numbers"
                });
            }

            if (limit <= 0 || page <= 0) {
                throw new BaseException("Limit and page must be positive numbers.", 400);
            }

            const possibleFields = ["_id", "name", "createdAt", "updatedAt"];
            const possibleSorts = [1, -1];

            if (!(possibleFields.includes(orderField) && possibleSorts.includes(Number(orderSort)))) {
                throw new BaseException("Invalid sort type or field.", 400);
            }

            let query = {};

            if (search && search.trim() !== '') {
                query.name = { $regex: search.trim(), $options: 'i' };
            }

            const data = await this.#_goodService.getAllGoods(limit,page,orderSort,orderField,query)
            res.status(200).send({
                message:"success",
                data:data
            })
        } catch (error) {
            next(error)
        }
    }

    createGoods = async (req,res,next) => {
        try {
            const {name,category,location,volume,volume_type} = req.body;
            const imageUrl = req.file?.filename || null;
            const data = await this.#_goodService.createGood(name,imageUrl,category,location,volume,volume_type);
            res.status(200).send({
                message:"success",
                data:data   
            })
        } catch (error) {
            next(error)
        }
    }

    updateGoods = async (req,res,next) => {
        try {
            const {name,category,imageUrl,location,volume,volume_type} = req.body;
            const id = req.params.id;
            
            if (!(isValidObjectId(id))) {
                throw new BaseException(`Given id: ${id} is not valid`,400)
            }

            const data = await this.#_goodService.updateGood(id,name,imageUrl,category,location,volume,volume_type);
            if(data.error){
                throw new BaseException(data.error,data.status);
            }
            res.status(200).send({
                message:"success",
                data:data
            })
        } catch (error) {
            next(error)
        }
    }

    deleteGoods = async (req,res,next) => {
        try {
            const id = req.params.id;
            
            if (!(isValidObjectId(id))) {
                throw new BaseException(`given id: ${id} is not valid`,400)
            }

            const data = await this.#_goodService.deleteGood(id);
            res.status(200).send({
                message:"success",
                data:data
            })
        } catch (error) {
            next(error)
        }
    }
}

export default new GoodsController()