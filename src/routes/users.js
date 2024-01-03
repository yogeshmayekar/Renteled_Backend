import express from 'express';
import { updateUser, deleteUser, getUser, getUsers} from '../controllers/user.js';
import { verifyAdmin, verifyUser } from '../utils/jwtservice.js'
const router = express.Router();

//Update Users api
router.put("/:id", verifyUser, updateUser);

//delete Users api
router.delete("/:id", verifyUser, deleteUser);

//get Users api
router.get("/:id", verifyUser, getUser);

//get all Users api
router.get("/", verifyAdmin, getUsers);

export default router;