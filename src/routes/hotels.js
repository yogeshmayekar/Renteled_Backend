import express from 'express';
const router = express.Router();
import { createHotel, deleteHotel, getAllHotels, getHotel, updateHotel, countByCity, countByHotelType, getHotelRooms} from '../controllers/hotel.js';
import { verifyAdmin } from '../utils/jwtservice.js';

// 1.1 Functional Api 
//create hotel api
router.post("/",verifyAdmin, createHotel);

//Update hotels api
router.put("/:id",verifyAdmin, updateHotel);

//delete hotel api
router.delete("/:id",verifyAdmin, deleteHotel);

//get hotel api
router.get("/find/:id", getHotel)

//get all hotels api
router.get("/", getAllHotels)

// 1.2 Non-Functional Api

// number of count city api 
router.get("/countByCity", countByCity);

// hotels count by hotel type api 
router.get("/countByType", countByHotelType);

// get hotel rooms api linked with hotel api
router.get("/room/:id", getHotelRooms); 

export default router;