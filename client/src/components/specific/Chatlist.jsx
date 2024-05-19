import { Stack } from '@mui/material'
import React from 'react'
import ChatItem from '../shared/ChatItem'

const Chatlist = ({
    w="100%",
    chats=[],
    chatId,
    onlineUsers=[],
    newMessageAlert=[{
        chatId:"",
        count:0,
    },], handleDeleteChat =()=>{}
}) => {
  return (
   <Stack width={w} direction={"column"}>
    {
        chats?.map((data, index) => {
          const { avatar, name, _id, groupChat, members } = data;

          const messageAlert = newMessageAlert.find(alert => alert.chatId === _id);

          const isOnline = members?.some(member => onlineUsers.includes(member));

          return (
            <ChatItem
              newMessageAlert={messageAlert}
              isOnline={isOnline}
              avatar={avatar}
              name={name}
              index={index}
              _id={_id}
              key={_id} 
              groupChat={groupChat}
              sameSender={chatId === _id}
               handleDeleteChat={handleDeleteChat}
            />
          );
        })
    }
   </Stack>
  );
}
export default Chatlist;
