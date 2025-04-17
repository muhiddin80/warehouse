import userService from "./user.service.js"

class userController {
    #_userService
    constructor(){
        this.#_userService= userService
    }
    getAllusers = async (req,res,next) => {
        try {
            const data = await this.#_userService.getAllUsers();
            res.send(data);
        } catch (error) {
            next(error);
        }
    }

    register = async (req,res,next) => {
        try {
            const {name,email,password} = req.body;
            const data = await this.#_userService.register(name,email,password);
            res.send(data)
        } catch (error) {
            next(error);
        }
    }

    login = async (req,res,next) => {
        try {
            const {email,password} = req.body;
            const data = await this.#_userService.login(email,password);
            res.send(data)
        } catch (error) {
            next(error)
        }
    }

    updateUser = async (req,res,next) => {
        try {
            const {name,email,password} = req.body;
            const id = req.params.id;

            const data = await this.#_userService.updatedUser(email,password,name,id);
            res.send(data)
        } catch (error) {
            next(error)
        }
    }

    deleteUser = async (req,res,next) => {
        try {
            const id = req.params.id;

            const data = await this.#_userService.deleteUser(id);
            res.send(data)
        } catch (error) {
            next(error)
        };
    }
}

export default new userController();