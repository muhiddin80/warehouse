import categoryModel from "./models/category.model.js";
import "../goods/models/goods.model.js";

class categoryService{
    #_categoryModel
    constructor(){
        this.#_categoryModel = categoryModel
    };

    getAllCategory = async () => {
        const categories = await this.#_categoryModel.find()
            .populate("goods")

        return categories;
    }

    getCategory = async (id) => {
        const category = await this.#_categoryModel.findById(id);

        return category;
    }

    createCategory = async (name,shelve) => {
        const category = await this.#_categoryModel.create({name,shelve});

        return category;
    }

    updateCategory = async (id,name,shelve) => {
        const foundedCategory  = await this.#_categoryModel.findById(id)

        if(!foundedCategory){
            return {
                error:"Category not found!",
                status:404
            }
        }

        const category = await this.#_categoryModel.findByIdAndUpdate(id,{name,shelve},{new:true})

        return category
    }

    deleteCategory = async (id) => {
        const foundedCategory  = await this.#_categoryModel.findById(id)
        
        if(!foundedCategory){
            return {
                error:"Category not found!",
                status:404
            }
        }

        const deletedCategory = await this.#_categoryModel.findByIdAndDelete(id);

        return deletedCategory;
    }
}

export default new categoryService();