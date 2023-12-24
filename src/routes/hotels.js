import express from 'express';
const router = express.Router();
import { createHotel, deleteHotel, getAllHotels, getHotel, updateHotel } from '../controllers/hotel.js';

//create hotel api
router.post("/", createHotel)

//Update hotels api
router.put("/:id", updateHotel)

//delete hotel api
router.delete("/:id", deleteHotel)

//get hotel api
router.get("/:id", getHotel)

//get all hotels api
router.get("/", getAllHotels)

export default router;