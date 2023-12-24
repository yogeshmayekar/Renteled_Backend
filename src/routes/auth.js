import express from 'express';
const router = express.Router();

router.get("/", (req, res)=>{
    res.send("hello");
})

router.get("/register", (req, res)=>{
    res.send("register end point");
})

export default router;