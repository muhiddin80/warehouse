import userModel from "./models/user.model.js";

class userService{
    #_userModel;
    constructor(){
        this.#_userModel = userModel;
    }


    getAllUsers = async ()=>{
        const users = await this.#_userModel.find();

        return {
            message:"success",
            count:users.length,
            data:users
        };
    }

    register = async (name,email,password) => {
        const foundedUser = await this.#_userModel.findOne({email});
        if(foundedUser){
            return {
                message:"User with this email or name is already exists!"
            }
        }
        const result = await this.#_userModel.create({name,email,password})
        return {
            message:"successfully created",
            data:result
        };
    }

    login = async (email,password) => {
        const foundedUser = await this.#_userModel.findOne({email,password});
        if(!foundedUser){
            return {
                message:"User with this email not found!"
            }
        }
        return {
            message:"success",
            data:foundedUser
        }
    }

    updatedUser =  async (email,password,name,id) => {
        const foundedUser = await this.#_userModel.findById(id);
        if(!foundedUser){
            return {
                message:"User with this email not found!"
            }
        }
        const updatedUser = await this.#_userModel.findByIdAndUpdate(id,{name,password},{new:true});
        return {
            message:"successfully updated",
            data:updatedUser,
        }
    }

    deleteUser = async (id) => {
        const foundedUser = await this.#_userModel.findById(id);
        if(!foundedUser){
            return {
                message:"User with this email not found!"
            }
        }

        const deletedUser = await this.#_userModel.findByIdAndDelete(id);
        return {
            message:"User successfully deleted!"
        }
    }



}

export default new userService();