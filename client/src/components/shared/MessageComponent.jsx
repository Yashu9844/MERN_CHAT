import { Box, Typography } from '@mui/material';
import React, { memo } from 'react'
import { lightBlue } from '../constatns/color';
import moment from 'moment';
import { fileFormat } from '../../lib/features.js';
import RenderAttachment from './RenderAttachment.jsx';

const MessageComponent = ({message,user}) => {
const {sender,content,attachments=[],createdAt} = message
const sameSender = sender?._id === user?._id;
const timeAgo = moment(createdAt).fromNow()
  return (
    <div style={{
        alignSelf: sameSender ? 'flex-end' : 'flex-start',
        backgroundColor:"white",
        color:"black",
        borderRadius:"5px",
        padding:"0.5rem",
        width:"fit-content",

    }}>
      {
        !sameSender && <Typography color={lightBlue} fontWeight={"600"} variant='caption' >{sender.name}</Typography>
      }{
        content && <Typography>{content}</Typography>
      }{
        attachments && attachments.map((attachment,index)=>{
           const url = attachment.url;
           const file = fileFormat(url);
           return (
            <Box key={index}><a href="" target='_blank' download style={{
              color:"black"
            }}>{RenderAttachment(file,url)}</a></Box>
           )
})
      }

    {/* Attachment */}
    <Typography variant='caption' color={"text.secondary"}>{timeAgo}</Typography>
    </div>
  )
}

export default memo(MessageComponent)
