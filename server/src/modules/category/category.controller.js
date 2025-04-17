import categoryService from "./category.service.js";

class userController{
    #_categoryService
    constructor(){
        this.#_categoryService= categoryService;
    };

    getAllCategory = async (req,res,next) => {
        try {
            const data = await this.#_categoryService.getAllCategory();
            res.send(data);
        } catch (error) {
            next(error)
        }
    }

    getCategory = async (req,res,next) => {
        try {
            const id = req.params.id;
            const data = await this.#_categoryService.getCategory(id);
            res.send(data);
        } catch (error) {
            next(error);
        }
    }

    createCategory = async (req,res,next) => {
        try {
            const {name,goods,shelve}= req.body;
            const data = await this.#_categoryService.createCategory(name,shelve);
            res.send(data)
        } catch (error) {
            next(error);
        }
    }

    updateCategory = async (req,res,next) => {
        try {  
            const {name,goods,shelve}= req.body;
            const id = req.params.id;
            const data = await this.#_categoryService.updateCategory(id,name,shelve);
            res.send(data)
        } catch (error) {
            next(error)
        }
    }

    deleteCategory = async (req,res,next) => {
        try {
            const id = req.params.id;
            const data = await this.#_categoryService.deleteCategory(id);
            res.send(data)
        } catch (error) {
            next(error);
        }
    }
}

export default new userController();