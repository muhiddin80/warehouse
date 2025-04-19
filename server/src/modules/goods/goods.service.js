import goodsModel from "./models/goods.model.js"


class GoodsService{
    #_goodsModel
    constructor(){
        this.#_goodsModel= goodsModel
    }

    getAllGoods = async () => {
        const goods = await this.#_goodsModel.find();
        return {
            message:"success",
            count:goods.length,
            data:goods
        }
    }

    createGood = async (name,imageUrl,category,location,volume,volume_type) => {
        const createGood = await this.#_goodsModel.create({name,imageUrl,category,location,volume,volume_type});
        return {
            message:"success",
            data:createGood
        }
    }

    updateGood = async (id,name,imageUrl,category,location,volume,volume_type) => {
        const updatedGood = await this.#_goodsModel.findByIdAndUpdate(id,{name,imageUrl,category,location,volume,volume_type},{new:true})

        return {
            message:"success",
            data: updatedGood
        }
    }

    deleteGood = async (id) => {
        const deletedGood = await this.#_goodsModel.findByIdAndDelete(id);

        return {
            message:"success",
            data:deletedGood
        }
    }
}

export default new GoodsService();