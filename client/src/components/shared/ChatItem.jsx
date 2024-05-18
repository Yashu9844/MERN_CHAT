
import React, { memo } from 'react'
import { Link } from '../styles/StyledComponent'
import { Box, Stack, Typography } from '@mui/material'


const ChatItem = ({
    avatar=[],
    name,
    _id,
    groupChat = false,
    sameSender,
    isOnline,
    newMessageAlert,
    index=0,
    handleDeleteChatOpen,
}) => {
    return (
        <Link to={`/chat/${_id}`} 
        onContextMenu={(e)=> handleDeleteChatOpen(e.id,groupChat)}>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                padding: '1rem',
                
                cursor: 'pointer',
                backgroundColor: sameSender ? 'black' : 'unset',
                color: sameSender? 'white' : 'unset',
                gap:"1rem",
               
                position:'relative'
            }}>
{
    /* Avatar Card  */
}
<Stack>
    <Typography>
        {name}
    </Typography>

    {
        newMessageAlert && (
            <Typography>{newMessageAlert.count}</Typography>
        )
    }
</Stack>
{
    isOnline && <Box sx={{
        width:"10px",
        height:"10px",
        borderRadius:"50%",
        backgroundColor:"green",
        position:"absolute",
        right:"1rem",
        top:"50%",
        transform:"translateY(-50%)"

    }} />
}


            </div>
        </Link>
    )
}


export default memo(ChatItem)
