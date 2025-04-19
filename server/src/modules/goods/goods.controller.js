import goodsService from "./goods.service.js"

class GoodsController{
    #_goodService
    constructor(){
        this.#_goodService = goodsService
    }

    getAllGoods = async (req,res,next) => {
        try {
            const data = await this.#_goodService.getAllGoods();
            res.send(data)
        } catch (error) {
            next(error)
        }
    }

    createGoods = async (req,res,next) => {
        try {
            const {name,category,imageUrl,location,volume,volume_type} = req.body;
            const data = await this.#_goodService.createGood(name,imageUrl,category,location,volume,volume_type);
            res.send(data)
        } catch (error) {
            next(error)
        }
    }

    updateGoods = async (req,res,next) => {
        try {
            const {name,category,imageUrl,location,volume,volume_type} = req.body;
            const id = req.params.id;

            const data = await this.#_goodService.updateGood(id,name,imageUrl,category,location,volume,volume_type);
            res.send(data)
        } catch (error) {
            next(error)
        }
    }

    deleteGoods = async (req,res,next) => {
        try {
            const id = req.params.id;
            const data = await this.#_goodService.deleteGood(id);
            res.send(data)
        } catch (error) {
            next(error)
        }
    }

}

export default new GoodsController()