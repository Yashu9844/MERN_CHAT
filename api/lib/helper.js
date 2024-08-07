import { userSocketIDs } from "../app.js";

export const getOtherMember = (members, userId) =>
    members.find((member) => member._id.toString() !== userId.toString());


export const getSockets = (users=[]) =>
    users.map((user)=>userSocketIDs.get(user._id.toString()))

export const getBase64 =(file)=>
      `data:${file.mimeType};base64,${file.buffer.toString("base64")}`;
