import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema(
    {
        name:{
            type: mongoose.SchemaTypes.String,
            required: true,
        },
        goods:[
            {
                type:mongoose.SchemaTypes.ObjectId,
                ref:"Goods"
            },
        ],
        shelve:{
            type:mongoose.SchemaTypes.String,
            required:true
        },
        warehouse:{
            type:mongoose.SchemaTypes.ObjectId,
            ref:"Warehouse"
        }
    },
    {
        collection:"Category",
        timestamps:true,
        versionKey:false
    })

export default mongoose.model("Category",CategorySchema);