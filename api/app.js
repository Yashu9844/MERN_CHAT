import express from 'express';
import userRoute from './routes/user.router.js'
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

const  port = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_CONNECT).then(()=>{
    console.log("connected to mongodb")
}).catch(err=>{
    console.log(err);
});
app.use(express.json());
app.use('/user',userRoute)

app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})