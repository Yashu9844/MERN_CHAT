import { User } from "../models/user.modedl.js";

export const test =(req,res,next)=>{
    res.send("hello world");
}
export const newUser = async (req,res,next)=>{
    const avatar = {
        public_id:"Sdfiuhdh",
        url:"asdasd"
    }

  const {name,username,password,bio} = req.body;

console.log(req.body)

 await User.create({name:name,
                    username:username,
                    password:password,
                    avatar:avatar,
                    bio:bio
 })
res.status(201).json({message:"USer created successfully"})
}