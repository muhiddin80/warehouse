import mongoose, { Collection } from "mongoose";


const WarehouseSchema = new mongoose.Schema(
    {
        name:{
            type: mongoose.SchemaTypes.String,
            required:true
        },
        type:{
            type: mongoose.SchemaTypes.String,
            required:true
        },
        owner:{
            type: mongoose.SchemaTypes.ObjectId,
            ref:"users"
        }
    },
    {
        collection:"Warehouse",
        timestamps:true,
        versionKey:false
    }
);

export default mongoose.model("Warehouse",WarehouseSchema);