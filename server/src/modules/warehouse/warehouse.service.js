import warehouseModel from "./models/warehouse.model.js"


class WarehouseSchema{
    #_warehouseModel
    constructor(){
        this.#_warehouseModel = warehouseModel;
    };

    getAllWarehouses = async () => {
        const warehouses = await this.#_warehouseModel.find();

        return{
            message:"success",
            count:warehouses.length,
            data:warehouses
        };
    };

    getWarehouse = async (id) => {
        const warehouse = await this.#_warehouseModel.findById(id);

        return {
            message: "success",
            data:warehouse
        }
    };

    createWarehouse = async (name,type,owner) => {
        const foundedWarehouse = await this.#_warehouseModel.findOne({name});

        if(foundedWarehouse){
            return {
                message:"This name is already exists!"
            }
        }

        const warehouse = await this.#_warehouseModel.create({name,type,owner});
        return {
            message:"successfully created",
            data:warehouse,
        }

    };

    updateWarehouse = async (id,name,type,owner) => {
        const foundedWarehouse = await this.#_warehouseModel.findOne({name})
        
        if(!foundedWarehouse){
            return {
                message:"Warehouse not found!"
            }
        };

        const warehouse = await this.#_warehouseModel.findByIdAndUpdate(id,{name,type,owner},{new:true});
        return {
            message:"successfully updated",
            data:warehouse
        }
    };

    deleteWarehouse = async (id) => {
        const foundedWarehouse = await this.#_warehouseModel.findById(id)
        
        if(!foundedWarehouse){
            return {
                message:"Warehouse not found!"
            }
        }

        await this.#_warehouseModel.findByIdAndDelete(id)
        return {
            message:"successfully deleted",
        }
    };
};

export default new WarehouseSchema();