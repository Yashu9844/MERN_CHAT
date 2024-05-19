import { Avatar, Dialog, DialogTitle, IconButton, ListItem, Stack, Typography } from '@mui/material'
import React, { memo } from 'react'
import { Add as AddIcon } from '@mui/icons-material'
import {sampleNotification} from '../constatns/sampleData.js'
const Notifications = () => {
 const friendRequestHandler = ({_id,accept})=>{

 }
  return (
    <Dialog open>
      <Stack p={{
        xs:'1rem',
        sm:'1rem'
      }} maxWidth={"25rem"} 
      sx={{
        textAlign: 'center',
      }}>
        <DialogTitle>Notifications</DialogTitle>
        {sampleNotification.length > 0 ? (
          sampleNotification.map(( {sender,_id}) => (
            <NotificationItem 
            sender={sender}
            _id={_id}
            handler={friendRequestHandler}
            key={_id}
            />))
        ) :  (
          <Typography>0 Notifications
          </Typography>
        )}
      </Stack>
    </Dialog>
  )
}
const NotificationItem = memo(({sender,_id,handler})=>{
  return (
    <ListItem >
    <Stack direction={"row"} 
            alignItems={"center"}
            spacing={"1rem"}
            width={"100%"}>
       
            <Avatar />
           

            <Typography
            variant='body1'
            component='span'
            sx={{
               flexFlow:1,
               display: '-webkit-box',
               WebkitLineClamp:1,
               WebkitBoxOrient:'Vertical',
              overflow: 'hidden',
            textOverflow: 'hidden', 
           width: '100%',                   }}
            
            >{name}</Typography>
        
           <IconButton size='small'sx={{
               bgcolor:'primary.main',
               color:"white",
               "&:hover":{
                   bgcolor:'primary.dark',
                   
               }
           }} onClick={()=>handler(_id)} disabled={handlerIsLoading}  >
               <AddIcon/>
            </IconButton>
   </Stack>  
</ListItem>
  )
})
export default Notifications
