import Room from '../models/rooms.js';
import Hotel from '../models/hotels.js';
import CustomErrorHandler from '../utils/error.js';


// create rooms
export const createRoom = async(req, res, next)=>{
    const hotelId = req.params.hotelid;
    const newRoom = new Room(req.body);

    try {
        const savedRoom = await newRoom.save();
        try {
          await Hotel.findByIdAndUpdate(hotelId, {
            $push: { rooms: savedRoom._id },
          });
        } catch (err) {
          next(CustomErrorHandler.unableToFindRoom());
        }
        res.status(200).json(savedRoom);
      } catch (err) {
        next(CustomErrorHandler.unableToCreateRoom());
      }
}

//update rooms
export const updateRoom = async (req, res, next) => {
    try {
      const updatedRoom = await Room.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json(updatedRoom);
    } catch (err) {
      next(CustomErrorHandler.unableToFindRoom());
    }
};

// delete rooms 
export const deleteRoom = async (req, res, next) => {
    const hotelId = req.params.hotelid;
    try {
      await Room.findByIdAndDelete(req.params.id);
      try {
        await Hotel.findByIdAndUpdate(hotelId, {
          $pull: { rooms: req.params.id },
        });
      } catch (err) {
        next(CustomErrorHandler.unableToFindRoom());
      }
      res.status(200).json("Room has been deleted.");
    } catch (err) {
      next(CustomErrorHandler.unableToDeleteRoom());
    }
};

// get single room 
export const getRoom = async (req, res, next) => {
    try {
      const room = await Room.findById(req.params.id);
      res.status(200).json(room);
    } catch (err) {
      next(CustomErrorHandler.unableToFetchRoom("unable to frtch room details"));
    }
};

//get all rooms
export const getRooms = async (req, res, next) => {
    try {
      const rooms = await Room.find();
      res.status(200).json(rooms);
    } catch (err) {
      next(CustomErrorHandler.unableToFetchRoom("unable to frtch all room details"));
    }
};