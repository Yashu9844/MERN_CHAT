import express from 'express';
import userRoute from './routes/user.router.js'
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const app = express();


mongoose.connect(process.env.MONGODB_CONNECT).then(()=>{
    console.log("connected to mongodb")
}).catch(err=>{
    console.log(err);
});
app.use('/user',userRoute)

app.listen(3000,()=>{
    console.log("server is running on port 3000")
})