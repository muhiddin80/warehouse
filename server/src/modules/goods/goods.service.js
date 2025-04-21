import categoryModel from "../category/models/category.model.js";
import goodsModel from "./models/goods.model.js"


class GoodsService{
    #_goodsModel
    constructor(){
        this.#_goodsModel= goodsModel
    }

    getAllGoods = async (limit,page,orderSort,orderField,query) => {
        const goods = await this.#_goodsModel.find(query)
            .sort({ [orderField]: Number(orderSort) })
            .skip((page - 1) * limit)
            .limit(Number(limit));
    
        return goods
    }

    createGood = async (name,imageUrl,category,location,volume,volume_type) => {
        const createGood = await this.#_goodsModel.create({name,imageUrl,category,location,volume,volume_type,entered:volume,taken:0});
        await categoryModel.findByIdAndUpdate(
            category, 
            { $push: { goods: createGood._id } },
            { new: true }
          );
        return createGood
    }

    updateGood = async (id,name,imageUrl,category,location,volume,volume_type) => {
        const good = await this.#_goodsModel.findById(id)
        if(!good){
            return {
                error:"Good not found!",
                status:404
            }
        }
        let taken = 0;
        let entered = 0;
        if(good.volume>volume){
            taken = good.volume - volume
        }else{
            entered = volume - good.volume;
        };
        const updatedGood = await this.#_goodsModel.findByIdAndUpdate(id,{name,imageUrl,category,location,volume,volume_type,entered:good.entered+entered,taken:good.taken+taken},{new:true})

        return {
            message:"success",
            data: updatedGood
        }
    }

    deleteGood = async (id) => {
        const good = await this.#_goodsModel.findByIdAndDelete(id);
    
        return {
            message:"success",
            data:good
        }
    }
}

export default new GoodsService();