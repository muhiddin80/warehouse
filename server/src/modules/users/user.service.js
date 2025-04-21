import userModel from "./models/user.model.js";
import { compare } from "bcrypt";

class userService{
    #_userModel;
    constructor(){
        this.#_userModel = userModel;
    }


    getAllUsers = async ()=>{
        const users = await this.#_userModel.find();

        return users
    }

    register = async (name,email,password) => {
        const foundedUser = await this.#_userModel.findOne({email});
        if(foundedUser){
            return {
                error:"User with this email or name is already exists!",
                status:400
            }
        }
        const result = await this.#_userModel.create({name,email,password})
        return result
    }

    login = async (email,password) => {
        const foundedUser = await this.#_userModel.findOne({email});
        if(!foundedUser){
            return {
                error:"User with this email not found!",
                status:404
            }
        }
        
        const isMatch = await compare(password, foundedUser.password);
    
        if(!isMatch){
            return {
                error:"Invalid password!",
                status:400
            }
        };
        return foundedUser;
    }

    updatedUser =  async (email,password,name,id) => {
        const foundedUser = await this.#_userModel.findById(id);
        if(!foundedUser){
            return {
                error:"User with this email not found!",
                status:404
            }
        }
        const updatedUser = await this.#_userModel.findByIdAndUpdate(id,{name,password},{new:true});
        return updatedUser
    }

    deleteUser = async (id) => {
        const foundedUser = await this.#_userModel.findById(id);
        if(!foundedUser){
            return {
                error:"User with this email not found!",
                status:404
            }
        }

        const deletedUser = await this.#_userModel.findByIdAndDelete(id);
        return {
            message:"User successfully deleted!"
        }
    }

    forgotPassword = async (email,token) => {
        const foundedUser = await this.#_userModel.findOne({email});
        if(!foundedUser){
            return {
                error:"User not found!",
                status:400
            }
        }
        foundedUser.token = token.toString("hex")
        await foundedUser.save()
        return foundedUser;
    }

    resetPassword = async (passwordHash,token) => {
        const findUser = await this.#_userModel.findOne({token});

        findUser.password = passwordHash;

        await findUser.save();

        return {
            message:"Password successfully changed!"
        }
    }
}

export default new userService();