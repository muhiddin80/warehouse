import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema(
    {
        name:{
            type: mongoose.SchemaTypes.String,
            required: true,
        },
        goods:[
            {
                type:mongoose.SchemaTypes.ObjectId
            },
        ],
        shelve:{
            type:mongoose.SchemaTypes.String,
            required:true
        }
    },
    {
        collection:"category",
        timestamps:true,
        versionKey:false
    })

export default mongoose.model("Category",CategorySchema);