import warehouseModel from "./models/warehouse.model.js"


class WarehouseSchema{
    #_warehouseModel
    constructor(){
        this.#_warehouseModel = warehouseModel;
    };

    getAllWarehouses = async () => {
        const warehouses = await this.#_warehouseModel.find();

        return warehouses;
    };

    getWarehouse = async (id) => {
        const warehouse = await this.#_warehouseModel.findById(id);

        return warehouse;
    };

    createWarehouse = async (name,type,owner,category) => {
        const foundedWarehouse = await this.#_warehouseModel.findOne({name});

        if(foundedWarehouse){
            return {
                error:"This name is already exists!",
                status:400
            }
        }

        const warehouse = await this.#_warehouseModel.create({name,type,owner,category});
        return warehouse;

    };

    updateWarehouse = async (id,name,type,owner,category) => {
        const foundedWarehouse = await this.#_warehouseModel.findOne({name})
        
        if(!foundedWarehouse){
            return {
                error:"Warehouse not found!",
                staus:404
            }
        };

        const warehouse = await this.#_warehouseModel.findByIdAndUpdate(id,{name,type,owner,category},{new:true});
        return warehouse
    };

    deleteWarehouse = async (id) => {
        const foundedWarehouse = await this.#_warehouseModel.findById(id)
        
        if(!foundedWarehouse){
            return {
                error:"Warehouse not found!",
                status:404
            }
        }

        await this.#_warehouseModel.findByIdAndDelete(id)
        return ;
    };
};

export default new WarehouseSchema();