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
        const result = this.#_userModel.create({name,email,password})
        return {
            message:"successfully created",
            data:result
        };
    }

}

export default new userService();