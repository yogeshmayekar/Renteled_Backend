import express from 'express';
import { createRoom, updateRoom, deleteRoom, getRoom, getRooms } from '../controllers/room.js';
import { verifyAdmin } from '../utils/jwtservice.js';

const router = express.Router();

// 1.1 functional api 
// create hotel api 
router.post("/:hotelid",verifyAdmin, createRoom);

// update room api
router.put("/:id", verifyAdmin, updateRoom);

//delete room api 
router.delete("/:id/:hotelid", verifyAdmin, deleteRoom);

// get single room api 
router.get("/:id", getRoom);

//get all room api
router.get("/", getRooms);

// 1.2 Non-Functional Api 


export default router;

