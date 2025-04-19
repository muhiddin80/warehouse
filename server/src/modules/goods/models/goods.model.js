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
        category:{
            type:mongoose.SchemaTypes.ObjectId,
            required:true
        },
        location:{
            type:mongoose.SchemaTypes.String,
            required
        },
        volume:{
            type:mongoose.SchemaTypes.Number,
            required
        },
        volume_type:{
            type:mongoose.SchemaTypes.String,
            enum:["kg","number"],
            default:"number"
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

export default mongoose.model("Good",GoodsSchema);