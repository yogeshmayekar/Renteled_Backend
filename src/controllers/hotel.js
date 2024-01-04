import Hotel from "../models/hotels.js";
import CustomErrorHandler from "../utils/error.js";

// logic of the create new hotel 
export const createHotel = async(req, res, next)=>{
    const newHotels = new Hotel(req.body)

    try{
        const saveHotel = await newHotels.save()
        res.status(200).json(saveHotel);
    }catch(err){
        return next(CustomErrorHandler.unableToCreateHotel("Unable to create hotel right now, please try after some time")) // handle error here
    }
}

// logic for update hotels 
export const updateHotel = async(req, res, next)=>{
    try{
        const updateHotel = await Hotel.findByIdAndUpdate(res.params.id, {$set:req.body}, {new:true})
        res.status(200).json(updateHotel);
    }catch(err){
        return next(CustomErrorHandler.unableToUpdateHotel("Unable to update hotel details right now, please try after some time"))
    }

}

// logic for the delete hotels 
export const deleteHotel = async(req, res, next)=>{
    try{
        await Hotel.findByIdAndDelete(res.params.id, {$set:req.body}, {new:true})
        res.status(200).json("hotel has been deleted");
    }catch(err){
        return next(CustomErrorHandler.unableToDeleteHotel("cant delete hotel right now, please try after some time."))
    }
}

// logic of the get hotel 
export const getHotel = async(req, res, next)=>{
    try{
        const hotel = await Hotel.findById(res.params.id)
        res.status(200).json(hotel);
    }catch(err){
        return next(CustomErrorHandler.unableToFetchHotel("Unable to get hotel details right now, please try after some time."))
    }
}

// logic of the get all hotels 
export const getAllHotels = async(req, res, next)=>{
    try{
        const hotels = await Hotel.find()
        res.status(200).json(hotels);
    }catch(err){
        return next(CustomErrorHandler.unableToFetchHotel("Unable to fetch hotels, please try after some time."))
    }
}
