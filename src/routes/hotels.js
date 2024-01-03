import express from 'express';
const router = express.Router();
import { createHotel, deleteHotel, getAllHotels, getHotel, updateHotel } from '../controllers/hotel.js';
import { verifyAdmin } from '../utils/jwtservice.js';

//create hotel api
router.post("/",verifyAdmin, createHotel);

//Update hotels api
router.put("/:id",verifyAdmin, updateHotel);

//delete hotel api
router.delete("/:id",verifyAdmin, deleteHotel);

//get hotel api
router.get("/:id", getHotel)

//get all hotels api
router.get("/", getAllHotels)

export default router;