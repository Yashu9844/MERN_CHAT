import { Box, Drawer, Grid, IconButton, Stack, Tooltip, Typography } from '@mui/material'
import React, { memo, useState } from 'react'
import { KeyboardBackspace as KeyboardBackSpaceIcon, Menu as MenuIcon } from '@mui/icons-material'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Link } from '../components/styles/StyledComponent'

import { sampleChats } from '../components/constatns/sampleData'
import AvatarCard1 from '../components/specific/AvatarCard1'

const Groups = () => {
  const navigate = useNavigate();
  const chatId = useSearchParams()[0].get('group')
  const [isMobile, setIsMobile] = useState(false);
  const [isEdit,setIsEdit] = useState(false);


  const navigateBack = () => {
    navigate("/");
  }

  const handleMobileClose = () => {
    setIsMobile(false);
  }

  const handleMobile = () => {
    setIsMobile(prev => !prev);
  }
  const GroupName = <>
  <stack>sd</stack>
  
  </>


  const IconsBtns = () => (
    <>
      <Box sx={{
        display: {
          xs: "block",
          sm: "none",
          position: "fixed",
          right: "1rem",
          top: "1rem"
        }
      }}>
        <IconButton onClick={handleMobile}>
          <MenuIcon />
        </IconButton>
      </Box>

      <Tooltip title='Back'>
        <IconButton
          sx={{
            position: 'absolute',
            top: "2rem",
            left: "2rem",
            bgcolor: "#1c1c1c",
            color: "white",
            ":hover": {
              bgcolor: "rgba(0,0,0,0.7)"
            }
          }} onClick={navigateBack}>
          <KeyboardBackSpaceIcon />
        </IconButton>
        {
          GroupName
        }
      </Tooltip>
    </>
  );

  return (
    <Grid container height={"100vh"}>
      <Grid item
        sx={{
          display: {
            xs: "none",
            sm: "block",
          },
        }}
        sm={4}
        bgcolor={"bisque"}
      >
        <GroupLists myGroups={sampleChats} chatId={chatId} />
      </Grid>
      <Grid item xs={12} sm={8} sx={{
        display: "flex",
        flexDirection: 'column',
        alignItems: "center",
        position: "relative",
        padding: '1rem 3rem'
      }}>
        <IconsBtns />
      </Grid>
      <Drawer open={isMobile} onClick={handleMobileClose} sx={{
        display: {
          xs: "block",
          sm: "none",
        }
      }}>
        <GroupLists width={"50vw"} myGroups={sampleChats} chatId={chatId} />
      </Drawer>
    </Grid>
  );
}

const GroupLists = ({ width = "100%", myGroups = [], chatId }) => (
  <Stack width={width} >
    {myGroups.length > 0 ? (
      myGroups.map(group => <GroupListItem group={group} key={group._id} currentChatId={chatId} />)
    ) : (
      <Typography textAlign={"center"}>No group</Typography>
    )}
  </Stack>
);

const GroupListItem = memo(({ group, chatId }) => {
  const { name, avatar, _id } = group;

  return (
    <Link to={`?group=${_id}`} onClick={(e)=>{
      if(chatId === _id) e.preventDefault();
    }}>
      <Stack direction={"row"} spacing={"1rem"} alignItems={"center"}  sx={{
        padding:"3vw",
        
      }}>
      <AvatarCard1 avatar={avatar} />
        <Typography>{name}</Typography>
      </Stack>
     
    </Link>
  );
});

export default Groups;