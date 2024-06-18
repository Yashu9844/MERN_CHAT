import { ALERT, REFETCH_CHATS } from "../constants/events.js";
import { getOtherMember } from "../lib/helper.js";
import { Chat } from "../models/chat.model.js";
import { emitEvent } from "../utils/features.js";

export const newGroupChat = async (req, res, next) => {
    try {
        const { name, members } = req.body;

        if (members.length < 2) {
            return next(errorHandler(400, "At least 2 members are required"));
        }

        const allMembers = [...members, req.user];
        await Chat.create({
            name,
            members: allMembers,
            groupChat: true,
            creator: req.user,
        });
        emitEvent(req, ALERT, allMembers, `Welcome to ${name} group`);
        emitEvent(req, REFETCH_CHATS, members);

        return res.status(201).json({
            success: true,
            message: `Welcome to ${name} group`
        });
    } catch (error) {
        next(error);
    }
};

export const getMyChats = async (req, res, next) => {
    try {
        const chats = await Chat.find({ members: req.user }).populate("members", "name avatar");
        const transformedChats = chats.map(({ _id, name, members, groupChat }) => {
            const otherMember = getOtherMember(members, req.user);
            return {
                _id,
                groupChat,
                avatar: groupChat ? members.slice(0, 3).map(({ avatar }) => avatar.url) : [otherMember.avatar.url],
                name: groupChat ? name : otherMember.name,
                members,
            };
        });

        res.status(200).json({
            success: true,
            chats: transformedChats
        });
    } catch (error) {
        next(error);
    }
};
