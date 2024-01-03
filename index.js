import express from "express";
import {PORT, DB_URL} from "./src/config/index.js";
import mongoose from 'mongoose';
import cors from 'cors';
// import routes from './src/routes/index.js';
import authRoute from './src/routes/auth.js';
import userRoute from './src/routes/users.js';
import hotelsRoute from './src/routes/hotels.js';
import cookieParser from "cookie-parser";
// import roomsRoute from './src/routes/rooms.js';
const app = express();


//DB connection 
const connectDb = async()=>{
    try{
        await mongoose.connect(DB_URL);
        console.log("DB connected")
    }catch(error){
        throw error
    }
}

mongoose.connection.on("disconnected", ()=>{
    console.log("mongodb disconnected")
})

mongoose.connection.on("connected", ()=>{
    console.log("mongodb connected")
})

// app.use(routes);
app.use(cookieParser())
app.use(express.json())
app.use(cors())
app.use("/api/auth", authRoute); //authentication api middleware 
app.use("/api/users", userRoute); //users api middleware   
app.use("/api/hotels", hotelsRoute); //hotels api middleware 
// app.use("/api/rooms", roomsRoute); //rooms api middleware 


app.listen(PORT, ()=>{
    connectDb()
    console.log(`connected to backend server ${PORT}`);
})

