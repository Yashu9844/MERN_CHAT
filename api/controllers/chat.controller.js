import { ALERT, REFETCH_CHATS } from "../constants/events.js";
import { getOtherMember } from "../lib/helper.js";
import { Chat } from "../models/chat.model.js";
import { User } from "../models/user.modedl.js";
import { errorHandler } from "../utils/error.js";
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
      message: `Welcome to ${name} group`,
    });
  } catch (error) {
    next(error);
  }
};

export const getMyChats = async (req, res, next) => {
  try {
    const chats = await Chat.find({ members: req.user }).populate(
      "members",
      "name avatar"
    );
    const transformedChats = chats.map(({ _id, name, members, groupChat }) => {
      const otherMember = getOtherMember(members, req.user);
      return {
        _id,
        groupChat,
        avatar: groupChat
          ? members.slice(0, 3).map(({ avatar }) => avatar.url)
          : [otherMember.avatar.url],
        name: groupChat ? name : otherMember.name,
        members: members.reduce((prev, curr) => {
          if (curr._id.toString() !== req.user.toString()) {
            prev.push(curr._id);
          }
          return prev;
        }, []),
      };
    });

    res.status(200).json({
      success: true,
      chats: transformedChats,
    });
  } catch (error) {
    next(error);
  }
};

export const getMyGroups = async (req, res, next) => {
  try {
    const chats = await Chat.find({
      members: req.user,
      groupChat: true,
      creator: req.user,
    }).populate("members", "name avatar");

    const groups = chats.map(({ members, _id, groupChat, name }) => ({
      _id,
      groupChat,
      name,
      avatar: members.slice(0, 3).map(({ avatar }) => avatar.url),
    }));

    res.status(200).json({
      success: true,
      groups,
    });
  } catch (error) {
    next(error);
  }
};

export const addMember = async (req, res, next) => {
  try {
    const { chatId, members } = req.body;

    if (!members || members.length < 1) {
      return next(errorHandler(400, "Please Provide Mmembers"));
    }
    const chat = await Chat.findById(chatId);

    if (!chat) {
      return next(errorHandler(404, "Chat not Found"));
    }
    if (!chat.groupChat) {
      return next(errorHandler(404, "Chat not Found"));
    }

    if (chat.creator.toString() !== req.user._id.toString()) {
      return next(errorHandler(403, "Your not Allowed to add membbers"));
    }

    const allNewMembersPromises = members.map((i) => User.findById(i, "name"));

    const allMembers = await Promise.all(allNewMembersPromises);

    const uniqueMembers = allMembers.filter(
      (i) => !chat.members.includes(i._id.toString())
    );

    chat.members.push(...uniqueMembers.map((i) => i._id));
    if (chat.members.length > 100) {
      return next(errorHandler(400, "Group Members limit reached"));
    }

    await chat.save();

    const allUserName = allMembers.map((i) => i.name).join(",");

    emitEvent(
      req,
      ALERT,
      chat.members,
      `${allUserName} has been added to ${chat.name} group by ${req.user.name}`
    );
    res.status(200).json({
      success: true,
      message: "All Members added  succesfully",
    });
  } catch (error) {
    next(error);
  }
};

export const removeMembers = async (req, res, next) => {
  try {
    const { chatId, userId } = req.body;

    const [chat, userThatIsRemoved] = await Promise.all([
      Chat.findById(chatId),
      User.findById(userId),
    ]);
    if (!chat) {
      return next(errorHandler(404, "Chat not Found"));
    }
    if (!userThatIsRemoved) {
      return next(errorHandler(404, "User not Found"));
    }
    if (!chat.groupChat) {
      return next(errorHandler(404, "Chat not Found"));
    }

    if (chat.creator.toString() !== req.user._id.toString()) {
      return next(errorHandler(403, "Your not Allowed to remove members"));
    }
    if (chat.members.length <= 3) {
      return next(errorHandler(400, "Group Members limit must be 3 Members"));
    }
    const groupMembers = chat.members;

    const AfterDeleteMembers = groupMembers.filter(
      (member) => member.toString() !== userId.toString()
    );

    chat.members = AfterDeleteMembers;

    await chat.save();

    emitEvent(
      req,
      ALERT,
      chat.members,
      `${userThatIsRemoved.name} has been removed from ${chat.name} group by ${req.user.name}`
    );
    emitEvent(req, REFETCH_CHATS, chat.members);

    res.status(200).json({
      success: true,
      message: "User Succesfully Deleted",
    });
  } catch (error) {
    next(error);
  }
};

export const leaveGroup = async (req, res, next) => {
  try {
    const chatId = req.params.id;
    const chat = await Chat.findById(chatId);

    if (!chat) {
      // console.error(`Chat not found for chatId: ${chatId}`);
      return next(errorHandler(404, "Chat not Found"));
    }
    
    const remainingMembers = chat.members.filter(member => member.toString() !== req.user.toString());

    if (remainingMembers.length < 3) {
      return next(errorHandler(400, "Group must contain at least 3 members"));
    }

    if (chat.creator.toString() === req.user.toString()) {
      // If the user leaving is the creator, assign a new creator from remaining members
      const newCreator = remainingMembers[0]; // Assuming the first member becomes the new creator
      chat.creator = newCreator;
    }

    chat.members = remainingMembers;
    const [user] = await Promise.all([User.findById(req.user, "name"), chat.save()]);

    emitEvent(req, ALERT, chat.members, `${user.name} has left the Group`);

    res.status(200).json({
      success: true,
      message: 'User left the Group successfully',
    });

  } catch (error) {
    console.error("Error in leaveGroup:", error);
    next(error);
  }
};

