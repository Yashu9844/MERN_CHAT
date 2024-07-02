
import { Chat } from "../models/chat.model.js";
import { User } from "../models/user.modedl.js"

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
                const totalMessages = await Chat.countDocuments({ chat: _id });

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
