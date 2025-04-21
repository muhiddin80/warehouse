import mongoose from "mongoose";

const GoodsSchema = new mongoose.Schema(
    {
        name:{
            type:mongoose.SchemaTypes.String,
            required:true,
        },
        imageUrl:{
            type:mongoose.SchemaTypes.String,
            required:false
        },
        location:{
            type:mongoose.SchemaTypes.String,
            required:true
        },
        volume:{
            type:mongoose.SchemaTypes.Number,
            required:true
        },
        volume_type:{
            type:mongoose.SchemaTypes.String,
            enum:["kg","number"],
            default:"number"
        },
        category:{
            type:mongoose.SchemaTypes.ObjectId,
            ref:"Category"
        },
        entered:{
            type:mongoose.SchemaTypes.Number,
        },
        taken:{
            type:mongoose.SchemaTypes.Number,
        }
    },
    {
        collection:"Goods",
        timestamps:true,
        versionKey:false
    }
)

export default mongoose.model("Goods",GoodsSchema);