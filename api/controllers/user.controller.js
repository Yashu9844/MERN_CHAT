import { User } from "../models/user.modedl.js";

export const test =(req,res,next)=>{
    res.send("hello world");
}
export const newUser = async (req,res,next)=>{
    const avatar = {
        public_id:"Sdfiuhdh",
        url:"asdasd"
    }
 await User.create({name:"chaman",
                    email:"chaman@gmail.com",
                    password:"123",
                    avatar:avatar
 })
res.status(201).json({message:"USer created successfully"})
}