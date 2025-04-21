import { ACCESS_TOKEN_EXPIRE_TIME, ACCESS_TOKEN_SECRET, REFRESH_TOKEN_EXPIRE_TIME, REFRESH_TOKEN_SECRET } from "../../config/jwt.config.js"
import { BaseException } from "../../exception/base.exception.js"
import { sendMail } from "../../utils/sendMail.utils.js"
import userService from "./user.service.js"
import jwt from "jsonwebtoken"
import crypto from "node:crypto"
import {hash} from "bcrypt"
import { isValidObjectId } from "mongoose"

class userController {
    #_userService
    constructor(){
        this.#_userService= userService
    }
    getAllusers = async (req,res,next) => {
        try {
            const data = await this.#_userService.getAllUsers();
            console.log(data)
            res.status(200).send(
                {
                    message:"success",
                    data:data
                });
        } catch (error) {
            next(error);
        }
    }

    register = async (req,res,next) => {
        try {
            const {name,email,password} = req.body;
            const hashPassword = await hash(password,10)
            const data = await this.#_userService.register(name,email,hashPassword);
            if(data.error){
                throw new BaseException(data.error,data.status);
            }
            console.log(data)
            const accessToken = jwt.sign(
                {id:data.id,role:data.role},
                ACCESS_TOKEN_SECRET,
                {
                    expiresIn:ACCESS_TOKEN_EXPIRE_TIME,
                    algorithm:"HS256"
                }
            );

            const refreshToken = jwt.sign(
                {id:data.id,role:data.role},
                REFRESH_TOKEN_SECRET,
                {
                    expiresIn:REFRESH_TOKEN_EXPIRE_TIME,
                    algorithm:"HS256"
                }
            );
            res.cookie("accessToken", accessToken, {
                maxAge: 60 * 100000,
                httpOnly: true,
              });
          
            res.cookie("refreshToken", refreshToken, {
                maxAge: 2 * 60 * 1000,
                httpOnly: true,
              });
            await sendMail({
                to:email,
                subject:"Welcome",
                text:`Hello ${data.name}.We are happy to have you in our project! If you need help you can connect us in thi number {+998996544055}`
            })
            res.status(200).send({
                message:"User successfully registered!",
                data:data,
                accessToken:accessToken
            })
        } catch (error) {
            next(error);
        }
    }

    login = async (req,res,next) => {
        try {
            const {email,password} = req.body;
            const data = await this.#_userService.login(email,password);
            if(data.error){
                throw new BaseException(data.error,data.status);
            }
            const accessToken = jwt.sign(
                {id:data.id,role:data.role},
                ACCESS_TOKEN_SECRET,
                {
                    expiresIn:ACCESS_TOKEN_EXPIRE_TIME,
                    algorithm:"HS256"
                }
            );

            const refreshToken = jwt.sign(
                {id:data.id,role:data.role},
                REFRESH_TOKEN_SECRET,
                {
                    expiresIn:REFRESH_TOKEN_EXPIRE_TIME,
                    algorithm:"HS256"
                }
            );
            res.cookie("accessToken", accessToken, {
                maxAge: 60 * 1000,
                httpOnly: true,
              });
          
            res.cookie("refreshToken", refreshToken, {
                maxAge: 2 * 60 * 1000,
                httpOnly: true,
              });

            data.accessToken = accessToken
            data.refreshToken= refreshToken;
            res.status(200).send({
                message:"Successfully logged in!",
                data:data,
                accessToken:accessToken
            })
        } catch (error) {
            next(error)
        }
    }

    updateUser = async (req,res,next) => {
        try {
            const {name,email,password} = req.body;
            const id = req.params.id;
            
            if (!(isValidObjectId(id))) {
                throw new BaseException(`given id: ${id} is not valid`,400)
            }

            const data = await this.#_userService.updatedUser(email,password,name,id);
            if(data.error){
                throw new BaseException(data.error,data.status);
            }
            res.status(200).send({
                message:"User successfully updated!",
                data:data
            })
        } catch (error) {
            next(error)
        }
    }

    deleteUser = async (req,res,next) => {
        try {
            const id = req.params.id;
            
            if (!(isValidObjectId(id))) {
                throw new BaseException(`given id: ${id} is not valid`,400)
            }

            const data = await this.#_userService.deleteUser(id);
            if(data.error){
                throw new BaseException(data.error,data.status);
            }
            res.status(200).send({
                message:"User successfully deleted!"
            });
        } catch (error) {
            next(error)
        };
    }

    forgotPasswod = async (req,res,next) => {
        try {
            const {email} = req.body;
            const token = crypto.randomBytes(50);

            const user = await this.#_userService.forgotPassword(email,token);

            if(user.error){
                throw new BaseException(user.error,user.status);
            }

            const server_base_url = "http://localhost:4000";

            await sendMail({
                to: email,
                subject: "Reset Your Password",
                html: `
                  <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 40px;">
                    <div style="max-width: 600px; margin: auto; background-color: #fff; border-radius: 10px; padding: 30px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
                      <h2 style="color: #333;">Password Reset Request</h2>
                      <p style="color: #555;">Hi there,</p>
                      <p style="color: #555;">We received a request to reset your password. Click the button below to set a new password:</p>
                      <a href="${server_base_url}/user/resetpassword?token=${user.token}" 
                         style="display: inline-block; margin: 20px 0; padding: 12px 24px; background-color: #007bff; color: #fff; text-decoration: none; border-radius: 5px;">
                        Reset Password
                      </a>
                      <p style="color: #999; font-size: 14px;">If you did not request a password reset, you can safely ignore this email.</p>
                      <hr style="border: none; border-top: 1px solid #eee;" />
                      <p style="font-size: 12px; color: #aaa;">This link will expire in 30 minutes for security reasons.</p>
                      <p style="font-size: 12px; color: #aaa;">© 2025 Your Company Name</p>
                    </div>
                  </div>
                `
            });

            res.status(200).send({
                message:"A message send to your email!"
            })
        } catch (error) {
            next(error)
        }
    }

    resetPassword = async (req,res,next) => {
        try {    
            const { password } = req.body;
            const { token } = req.query;

            if(!token){
                throw new BaseException("Enter the token!",400)
            }
            const passwordHash = await hash(password, 10);

            const user = await this.#_userService.resetPassword(passwordHash,token);
            if(user.error){
                throw new BaseException(user.error,user.status);
            };
            res.status(200).send("Successfully changed password!")
        } catch (error) {
            next(error)   
        }
    }
}

export default new userController();