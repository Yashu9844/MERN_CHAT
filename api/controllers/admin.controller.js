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