import React, { memo } from 'react';
import { Link } from '../styles/StyledComponent';
import { Box, Stack, Typography } from '@mui/material';
import Avatar from './Avatar';


const ChatItem = ({
    avatar = [],
    name,
    _id,
    groupChat = false,
    sameSender,
    isOnline,
    newMessageAlert,
    index = 0,
    handleDeleteChat,
}) => {

    const handleContextMenu = (e) => {
        e.preventDefault();
        // Use alert to check if the function is called
        alert(`Delete chat: ${_id}, Group chat: ${groupChat}`);
        handleDeleteChat(e, _id, groupChat);
    };


    return (
        <Link
                   to={`/chat/${_id}`}
       
            onContextMenu={handleContextMenu}
            style={{ padding: 0 }}
        >
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '1rem',
                    cursor: 'pointer',
                    backgroundColor: sameSender ? 'black' : 'unset',
                    color: sameSender ? 'white' : 'unset',
                    gap: '1rem',
                    position: 'relative',
                }}
            >
                <Avatar avatar={avatar}/>
                <Stack>
                    <Typography>
                        {name}
                    </Typography>
                
                </Stack>
                {isOnline && (
                    <Box
                        sx={{
                            width: '10px',
                            height: '10px',
                            borderRadius: '50%',
                            backgroundColor: 'green',
                            position: 'absolute',
                            right: '1rem',
                            top: '50%',
                            transform: 'translateY(-50%)',
                        }}
                    />
                )}
            </div>
        </Link>
    );
};

export default memo(ChatItem);
