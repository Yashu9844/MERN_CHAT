
import { Chat } from "../models/chat.model.js";
import { Message } from "../models/message.model.js";
import { User } from "../models/user.modedl.js"
import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken'

export const allUsers = async (req,res,next)=>{
    try {
        const users = await User.find({});

        const transformedUsers = await Promise.all(
            users.map(async( {name,_id,username,avatar})=>{
                const [groups , friends] = await Promise.all(
                    [ Chat.countDocuments({groupChat:true,members:_id}),
                     Chat.countDocuments({members:_id,groupChat:false})
                    ]
                )

                return {
                    _id,
                    name,
                    username,
                    avatar: avatar.url,
                    groups,
                    friends
                }
                
            })
        )

        return res.status(200).json({
            success:true,
            users:transformedUsers
        })
    } catch (error) {
        next(error)
    }
}

export const allChats = async (req, res, next) => {
    try {
        const { page = 1, limit = 10 } = req.query; // Get pagination parameters from query
        const chats = await Chat.find({})
            .populate("members", "name avatar")
            .populate("creator", "name avatar")
            .skip((page - 1) * limit)
            .limit(Number(limit));

        const transformedChats = await Promise.all(
            chats.map(async ({ _id, groupChat, name, members, creator }) => {
                const totalMessages = await Message.countDocuments({ chat: _id });
                

                return {
                    _id,
                    name,
                    groupChat,
                    avatar: members.slice(0, 3).map(member => member.avatar.url),
                    members: members.map(({ _id, name, avatar }) => ({
                        _id,
                        name,
                        avatar: avatar.url
                    })),
                    creator: {
                        name: creator?.name || "",
                        avatar: creator?.avatar?.url || ""
                    },
                    totalMessages,
                    totalMembers: members.length
                };
            })
        );
  
        const totalChats = await Chat.countDocuments();

        return res.status(200).json({
            success: true,
            chats: transformedChats,
            totalPages: Math.ceil(totalChats / limit),
            currentPage: page
        });
    } catch (error) {
        next(error);
    }
};

export const allMessages = async (req, res,next) => {
    try {
  const messages = await Message.find({}).populate("sender","name avatar").populate("chat","groupChat");

 const transformedMessages = messages.map(({_id,attachments,sender,content,chat,createdAt})=>({
    _id,
    createdAt,
    content,
    attachments,
    sender : {
        _id:sender._id,
        name:sender.name,
        avatar:sender.avatar.url
    },
    groupChat:chat.groupChat
    
 }))

  res.status(200).json({
    success:true,
    transformedMessages
  })

        
    } catch (error) {
        next(error)
    }
}

export const getDashBoardStats = async (req,res,next)=>{
    try {
        const [totalGroupChats,totalUsers,totalChats,totalMessages]  = await Promise.all([
            Chat.countDocuments({groupChat:true}),
            User.countDocuments(),
            Chat.countDocuments(),
            Message.countDocuments()
        ])
       
   const today = new Date();
  const last7Days = new Date();
  last7Days.setDate(last7Days.getDate() - 7);
const messages = new Array(7).fill(0)
 const last7DaysMessage = await Message.find({
    createdAt: {$gte:last7Days}
 }).select("createdAt")


const daysInMillioSeconds = 1000*60*60*24;


last7DaysMessage.forEach((message)=>{
    const index = Math.floor((today.getTime() - message.createdAt.getTime())/daysInMillioSeconds)

    messages[6-index]++;
})
const stats = {
    totalGroupChats,
    totalUsers,
    totalChats,
    totalMessages,
    messagesChart:messages
}



        return res.status(200).json({
            success:true,
            stats
        })
        
}catch(error){

}
}
export const adminLogin = async (req,res,next)=>{
    try {
        const {secretKey} = req.body;

        const adminLoginSecretKEy = process.env.ADMIN_SECREAT || " ";

        const isMatched = adminLoginSecretKEy === secretKey;

        if(!isMatched) return next(errorHandler(401,"Admin Login Unauthorized"));

        const token = jwt.sign(adminLoginSecretKEy,process.env.JWT_SECREAT);

        res.status(200).cookie('access_token',token,{
            httpOnly: true,
            maxAge: 15 * 24 * 60 * 60 * 1000,
            secure: true
        }).json({
            success: true,
            message: "Admin Login Successful"
        })
 1       
    } catch (error) {
        next(error)
    }
}

export const adminLogout = async(req,res,next)=>{
    try {

        return res.status(200).cookie("access_token","",{
            httpOnly:true,
            maxAge:0,
            secure:true
        }).json({
            success:true,
            message: "Admin Logout Successful"
        })
        
    } catch (error) {
        next(error)
    }
}