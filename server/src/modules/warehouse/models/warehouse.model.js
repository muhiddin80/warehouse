import mongoose from "mongoose";


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
        },
        category:[
            {
                type:mongoose.SchemaTypes.ObjectId,
                ref:"Category"
            }
        ]
    },
    {
        collection:"Warehouse",
        timestamps:true,
        versionKey:false
    }
);

export default mongoose.model("Warehouse",WarehouseSchema);