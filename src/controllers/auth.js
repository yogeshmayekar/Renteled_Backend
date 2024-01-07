import User from "../models/user.js";
import Joi from 'joi'
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/index.js";
import CustomErrorHandler from "../utils/error.js";


//1. register controller 
export const register = async(req, res, next)=>{
    try{
        //1.1 validation
    
        const registerSchema = Joi.object({
            username:Joi.string().min(3).max(30).required(),
            email:Joi.string().email().required(),
            password:Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
            repeat_password:Joi.ref('password')
        })
  
        const {error} = registerSchema.validate(req.body);
  
        if (error){
            return next(error)
        }

        //1.2 check user is in the database already
        try{
            const Exist = await User.exists({email:req.body.email});//it will returen true or false
            if(Exist===true) {
                return next(CustomErrorHandler.alreadyExist("Email Id is already Exist"));
        }
        }catch(err){
            next()
        }

    
        //1.3 Hashing password
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        //1.4 prepare the model
        const newUser = new User({
            username:req.body.username,
            email:req.body.email,
            password:hashedPassword
        })
        
        await newUser.save()
        res.status(200).send("User has been created.");
    }catch(err){
        // console.log(err)
        next(CustomErrorHandler.unableToCreateUser("someting went wrong while sign up, please try after some time."))
    }
}


//2. login controller 
export const login = async(req, res, next)=>{
    try{
        const user = await User.findOne({username:req.body.username})
        if(!user) return next(CustomErrorHandler.incorerctCredentials())

        //compare the password
        const match = await bcrypt.compare(req.body.password, user.password)
        if(!match){
            return next(CustomErrorHandler.incorerctPassword())
        }

        //token
        const token = jwt.sign({id:user._id, isAdmin:user.isAdmin}, JWT_SECRET, {expiresIn:"1d"})

        const {password, isAdmin, ...otherDetails} = user._doc
        res.cookie("access_token", token, {
            httpOnly:true
        }).status(200).json({ details: { ...otherDetails }, isAdmin });

    }catch(err){
        next(CustomErrorHandler.unAuthorized());
    }

}

//logout 
export const logout = (req, res, next)=>{
    res.clearCookie('jwtToken', {path:'/'});
    return res.status(200).json({ message: 'Logout successful' });
}