import mongoose from "mongoose";
import { ROLES } from "../../../constants/roles.constants.js";

const userSchema = new mongoose.Schema(
    {
        name:{
            type: mongoose.SchemaTypes.String,
            required: true,
            unique: true
        },
        email:{
            type: mongoose.SchemaTypes.String,
            required: true,
            unique: true
        },
        password:{
            type: mongoose.SchemaTypes.String,
            required: true,
            unique: true
        },
        role:{
            type:mongoose.SchemaTypes.String,
            enum:[ROLES.WORKER,ROLES.VIEWER,ROLES.SUPER_ADMIN,ROLES.OWNER],
            default: ROLES.VIEWER
        },
        token:{
            type:mongoose.SchemaTypes.String,
            required:false
        }
    },
    {
        collection:"users",
        timestamps:true,
        versionKey:false
    }
)
export default mongoose.model("User",userSchema);