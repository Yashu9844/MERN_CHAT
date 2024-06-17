import { compare } from "bcrypt";
import { User } from "../models/user.modedl.js"; // Fix the typo in the import path
import { errorHandler } from "../utils/error.js";
import { sendToken } from "../utils/features.js";

export const test = (req, res, next) => {
    res.send("hello world");
}

export const newUser = async (req, res, next) => {
    const avatar = {
        public_id: "Sdfiuhdh",
        url: "asdasd"
    }

    try {
        const { name, username, password, bio } = req.body;

        // Basic input validation (you might want to use a library like Joi or express-validator for more complex validation)
        if (!name || !username || !password) {
            return res.status(400).json({ message: "Name, username, and password are required" });
        }

        // Create a new user
        const user = await User.create({
            name,
            username,
            password,
            avatar,
            bio
        });

        sendToken(res,user,201,"User Created")

        res.status(201).json({ message: "User created successfully", user });

    } catch (error) {
       
        next(errorHandler(500,'User cant signup'))
    }
}

export const logout = async (req, res, next) => {

    
}

export const login = async (req, res, next) => {

    const { username ,password } = req.body
  
   try {
     const user = await User.findOne({username}).select("+password")
 
     if(!user){
         return next(errorHandler(404,"User not found"))
     }
    
 
     const isMatch =  await compare(password,user.password);
 
     if(!isMatch){
         return next(errorHandler(401,"Invalid password"))
     }
    
     const {password:pass , ...rest} = user._doc;

   sendToken(res,rest,200,`Welcome Back ${user.name} `)
   } catch (error) {
    next(error)
    
   }

}
