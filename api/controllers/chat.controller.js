import { ALERT, REFETCH_CHATS } from "../constants/events.js";
import { Chat } from "../models/chat.model.js";
import { emitEvent } from "../utils/features.js";

export const newGroupChat = async (req,res,next) => {
    try {
        const {name,members} = req.body;

        if(members.length < 2){
            return next(errorHandler(400,"Atleast 2 members are required"));
        }

        const allMembers = [...members,req.user]
        await Chat.create({
            name,
            members:allMembers,
            groupChat:true,
            creator:req.user,
        })
        emitEvent(req,ALERT,allMembers,`welcome to ${name} group `);
        emitEvent(req,REFETCH_CHATS,members)

        return res.status(201).json({
            success:true,
            message:`welcome to ${name} group `
        })
    } catch (error) {
        next(error)
        
    }
}