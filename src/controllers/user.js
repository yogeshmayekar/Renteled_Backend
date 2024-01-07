import User from "../models/user.js";
import CustomErrorHandler from "../utils/error.js"

// logic of the get user
export const getUser = async(req, res, next)=>{
    try{
        // console.log("user id is", req.params.id)
        const user = await User.findById({_id:req.params.id}).select('-updatedAt -createdAt -__v');
        // console.log("nothing", user);
        res.status(200).json(user);
    }catch(err){
        next(CustomErrorHandler.notFound("User not found"));
    }
}

// logic of the get all users 
export const getUsers = async(req, res, next)=>{
    try{
      const users = await User.find().select('-updatedAt -createdAt -__v');
      res.status(200).json(users);
    }catch(err){
      next(CustomErrorHandler.notFound("Users not found"));
    }
}

//logic for update users
export const updateUser = async (req,res,next)=>{
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (err) {
      next(CustomErrorHandler.unableToUpdateUser());
    }
}

//logic for delete user
export const deleteUser = async (req,res,next)=>{
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("User has been deleted.");
    } catch (err) {
      next(CustomErrorHandler.unableToDeleteUser());
    }
}