import Hotel from "../models/hotels.js";
import CustomErrorHandler from "../utils/error.js";

// logic of the create new hotel 
export const createHotel = async(req, res, next)=>{
    const newHotels = new Hotel(req.body)

    try{
        const saveHotel = await newHotels.save()
        res.status(200).json(saveHotel);
    }catch(err){
        return next(err) // handle error here
    }
}

// logic for update hotels 
export const updateHotel = async(req, res, next)=>{
    try{
        const updateHotel = await Hotel.findByIdAndUpdate(res.params.id, {$set:req.body}, {new:true})
        res.status(200).json(updateHotel);
    }catch(err){
        res.status(500).json(err)
    }

}

// logic for the delete hotels 
export const deleteHotel = async(req, res, next)=>{
    try{
        await Hotel.findByIdAndDelete(res.params.id, {$set:req.body}, {new:true})
        res.status(200).json("hotel has been deleted");
    }catch(err){
        res.status(500).json(err)
    }
}

// logic of the get hotel 
export const getHotel = async(req, res, next)=>{
    try{
        const hotel = await Hotel.findById(res.params.id)
        res.status(200).json(hotel);
    }catch(err){
        res.status(500).json(err)
    }
}

// logic of the get all hotels 
export const getAllHotels = async(req, res, next)=>{
    try{
        const hotels = await Hotel.find()
        res.status(200).json(hotels);
    }catch(err){
        res.status(500).json(err)
    }
}
