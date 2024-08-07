import { compare } from "bcrypt";
import { User } from "../models/user.modedl.js"; // Fix the typo in the import path
import { errorHandler } from "../utils/error.js";
import { emitEvent, sendToken, uploadCloudainary } from "../utils/features.js";
import { Chat } from "../models/chat.model.js";
import { Request } from "../models/request.model.js";
import { NEW_REQUEST, REFETCH_CHATS } from "../constants/events.js";
import { getOtherMember } from "../lib/helper.js";

export const test = (req, res, next) => {
    res.send("hello world");
}

export const newUser = async (req, res, next) => {
    try {
      const { name, username, password, bio } = req.body;
      console.log('Received Data:', { name, username, password, bio });
      console.log('Received File:', req.file);
  
      // Basic input validation
      if (!name || !username || !password) {
        return res.status(400).json({ message: "Name, username, and password are required" });
      }
  
    //   const file = req.file;
    //   if (!file) {
    //     return next(errorHandler(401, "Please upload a file"));
    //   }
  
    //   const result = await uploadCloudainary([file]);
    //   console.log('Cloudinary Result:', result);
  
    //   const avatar = {
    //     public_id: result[0].public_id,
    //     url: result[0].url
    //   };
  
      // Create a new user
      const user = await User.create({
        name,
        username,
        password,
        // avatar,
        bio
      });
  
      const { password: pass, ...rest } = user._doc;
  
      sendToken(res, rest, 201, "User Created");
  
      res.status(201).json({ message: "User created successfully", user });
  
    } catch (error) {
      console.log('Error:', error);
      next(error);
    }
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
export const getMyProfile =async (req,res, next) => {

  try {
    const hellouser = await User.findOne({_id:req.user._id});
  console.log(hellouser)
      res.status(200).json({
          success:true,
          user:hellouser
      })
  } catch (error) {
    next(error)
    
  }
}
export const logout =  (req, res, next) => {

    try {
        res.clearCookie('access_token').status(200  ).json("user succesfully Loged Out")
    } catch (error) {
        
    }
}

export const searchUser = async (req, res, next) => {

    const {name } = req.query;
    const myChats = await Chat.find({
        groupChat:false,
        members:req.user
    })

  const allUsersFromMyChats = myChats.flatMap((chat)=>chat.members);

  const allUsersExceptMeAndFriends = await User.find({
    _id:{$nin:allUsersFromMyChats},
    name:{$regex:name , $options:"i"},
    })
  
 const users = allUsersExceptMeAndFriends.map(({_id,name,avatar})=> {
    return {
        _id,
        name,
        avatar:avatar.url
    }
 })


    res.status(200).json({
        success:true,
        users
    })
}

export const sendRequest = async (req,res,next)=>{

    const {userId } = req.body;

    try {
  const request = await Request.findOne({
    $or:[
        {sender:req.user,receiver:userId},
        {sender:userId,receiver:req.user}
  
    ],
  })

  if(request) return next(errorHandler(400,"Already request sent"))

    await Request.create({
        sender:req.user,
        receiver:userId
    })
  emitEvent(req,NEW_REQUEST,[userId],"Request sent")
        
 res.status(200).json({
        success:true,
        message:"Request sent successfully"
    })

        
    } catch (error) {
    next(error);       
    }



}

export const acceptRequest = async (req, res, next) => {
    try {
        const { requestId, accept } = req.body;

        // Correctly query the database using an object
        const request = await Request.findOne({ _id: requestId }).populate("sender", "name").populate("receiver", "name");

        if (!request) return next(errorHandler(404, "Request not found"));
        // console.log("Receiver ID from request:", request.receiver._id.toString());
        // console.log("User ID from req:", req.user._id.toString());
        if (request.receiver._id.toString() !== req.user._id.toString()) {
            return next(errorHandler(401, "Unauthorized e"));
        }

        if (!accept) {
            await request.deleteOne();
            return res.status(200).json({
                success: true,
                message: "Request rejected"
            });
        } else {
            const members = [request.sender._id, request.receiver._id];

            await Promise.all([
                Chat.create({
                    members,
                    name: `${request.sender.name}-${request.receiver.name}`,
                }),
                request.deleteOne()
            ]);

            emitEvent(req, REFETCH_CHATS, members, "Chat Created");

            return res.status(200).json({
                success: true,
                message: "Request accepted",
                senderID: request.sender._id
            });
        }
    } catch (error) {
        next(error);
    }
};


export const getAllNotifications = async (req,res,next )=>{
    try {
        const requests = await Request.find({ receiver:req.user}).populate("sender","name avatar");

        const allRequests = requests.map(({_id,sender}) =>(
            {
                _id,
                sender:{
                    _id:sender._id,
                    name:sender.name,
                    avatar:sender.avatar.url
                }
            }
        ))
                  res.status(200).json({
                    success:true,
                 allRequests
                  })                                                   

        
    } catch (error) {
        next(error)
    }
}


export const getMyFriends = async (req,res,next)=>{
    try {
        const chatId = req.query.chatId;

        const chats  = await Chat.find({
            members: req.user,
            groupChat:false
        }).populate("members","name avatar")

        const friends = chats.map(({members})=>{
            const otherUser = getOtherMember(members,req.user);

            return {
                _id:otherUser._id,
                name:otherUser.name,
                avatar:otherUser.avatar.url
            }
        })
        let availableFriends = friends;
        if(chatId){
            const chat = await Chat.findById(chatId);
            availableFriends = friends.filter(friend => !chat.members.includes(friend._id));
        }

        return res.status(200).json({
            success:true,
            availableFriends
        })

        
    } catch (error) {
        next(error)
    }
}