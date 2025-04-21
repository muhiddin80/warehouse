import categoryService from "./category.service.js";
import { isValidObjectId } from "mongoose";
import { BaseException } from "../../exception/base.exception.js";

class userController{
    #_categoryService
    constructor(){
        this.#_categoryService= categoryService;
    };

    getAllCategory = async (req,res,next) => {
        try {
            const data = await this.#_categoryService.getAllCategory();
            res.status(200).send({
                message:"success",
                data:data
            })
        } catch (error) {
            next(error)
        }
    }

    getCategory = async (req,res,next) => {
        try {
            const id = req.params.id;
            
            if (!(isValidObjectId(id))) {
                throw new BaseException(`given id: ${id} is not valid`,400)
            }

            const data = await this.#_categoryService.getCategory(id);
            if(data==null){
                throw new BaseException("Category not found",404)
            }
            res.status(200).send({
                message:"success",
                data:data,
            })
        } catch (error) {
            next(error);
        }
    }

    createCategory = async (req,res,next) => {
        try {
            const {name,goods,shelve}= req.body;
            const data = await this.#_categoryService.createCategory(name,shelve);
            res.status(200).send({
                message:"success",
                data:data
            })
        } catch (error) {
            next(error);
        }
    }

    updateCategory = async (req,res,next) => {
        try {  
            const {name,goods,shelve}= req.body;
            const id = req.params.id;
            
            if (!(isValidObjectId(id))) {
                throw new BaseException(`given id: ${id} is not valid`,400)
            }

            const data = await this.#_categoryService.updateCategory(id,name,shelve);
            if(data.error){
                throw new BaseException(data.error,data.status)
            }
            res.status(200).send({
                message:"success",
                data:data
            })
        } catch (error) {
            next(error)
        }
    }

    deleteCategory = async (req,res,next) => {
        try {
            const id = req.params.id;
            
            if (!(isValidObjectId(id))) {
                throw new BaseException(`given id: ${id} is not valid`,400)
            }

            const data = await this.#_categoryService.deleteCategory(id);
            if(data.error){
                throw new BaseException(data.error,data.status)
            }
            res.status(200).send({
                message:"success",
                data:data
            })
        } catch (error) {
            next(error);
        }
    }
}

export default new userController();