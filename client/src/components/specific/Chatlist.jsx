import { Stack } from '@mui/material'
import React from 'react'
import ChatItem from '../shared/ChatItem'

const Chatlist = ({
    w="100%",
    chats=[],
    chatId,
    onlineUsers=[],
    newMessageAlerts=[{
        chatId:"",
        count:0,
    },],handleDeleteChatOpen =()=>{}}
) => {
  return (
   <Stack width={w} direction={"column"}>
    {
        chats?.map((data,index)=>{
         const {avatar, name,_id ,groupChat,members} =data ;

         const newMessageAlert =newMessageAlerts.find((chatId)=>chatId === _id)

         const isOnline = members?.some((members)=>onlineUsers.includes(_id))
       
        return (
            <ChatItem newMessageAlert={newMessageAlert} isOnline={isOnline} avatar={avatar} 
            name={name}     
            index={index}
            _id={_id}
            Key={_id}
            groupChat={groupChat}
            sameSender={chatId === _id}
            handleDeleteChatOpen={handleDeleteChatOpen}
        
            />
        )
        })
    }

   </Stack>
  )
}
export default Chatlist
