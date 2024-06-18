import express from 'express';
import userRoute from './routes/user.router.js'
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { errorShow } from './utils/features.js';
import cookieParser from 'cookie-parser';
import userChat from './routes/chat.route.js'
import { createUser } from './seeders/seed.user.js';
dotenv.config();

const app = express();

const  port = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_CONNECT).then(()=>{
    console.log("connected to mongodb")
}).catch(err=>{
    console.log(err);
});

// createUser(10)
app.use(express.json());
app.use(cookieParser())
app.use('/user',userRoute)
app.use('/chat',userChat)

app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})

app.use(errorShow)