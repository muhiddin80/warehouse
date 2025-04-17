import categoryModel from "./models/category.model.js";

class categoryService{
    #_categoryModel
    constructor(){
        this.#_categoryModel = categoryModel
    };

    getAllCategory = async () => {
        const categories = await this.#_categoryModel.find();

        return {
            message:"success",
            count: categories.length,
            data:categories
        }
    }

    getCategory = async (id) => {
        const category = await this.#_categoryModel.findById(id);

        return {
            message:"success",
            data:category,
        }
    }

    createCategory = async (name,shelve) => {
        const category = await this.#_categoryModel.create({name,shelve});

        return {
            message:"created successfully",
            data:category
        }
    }

    updateCategory = async (id,name,shelve) => {
        const foundedCategory  = await this.#_categoryModel.findById(id)

        if(!foundedCategory){
            return {
                message:"Category not found!"
            }
        }

        const category = await this.#_categoryModel.findByIdAndUpdate(id,{name,shelve},{new:true})

        return {
            message:"Successfully updated!",
            data:category
        }
    }

    deleteCategory = async (id) => {
        const foundedCategory  = await this.#_categoryModel.findById(id)
        
        if(!foundedCategory){
            return {
                message:"Category not found!"
            }
        }

        const deletedCategory = await this.#_categoryModel.findByIdAndDelete(id);

        return {
            message:"Successfully deleted!",
            data:deletedCategory,
        }
    }
}

export default new categoryService();