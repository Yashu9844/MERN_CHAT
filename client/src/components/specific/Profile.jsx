import { Avatar, Stack, Typography } from '@mui/material'
import React from 'react'

const Profile = () => {
  return (
    <Stack spacing={"2rem"} direction={"column"} alignItems={"center"}  >
        <Avatar sx={{
            width:"10rem",
            height:"10rem",
            border:"5px solid black",
            objectFit:"contain",
            
            marginBottom:'1rem',
            boxShadow:"0px 0px 10px 0px rgba(0,0,0,0.5)"
        }}/>
       <ProfileCard heading={"Bio"} text={"asdfhbkjjnkjl nklasndjklnadnnn oijaoijsdiofj"}/>
       <ProfileCard heading={"Username"} text={"Yashwanth R"}/>
       <ProfileCard heading={"Name"} text={"Siddesh"}/>
    </Stack>
  )
}
const ProfileCard = ({text , icon , heading})=>
    <Stack direction={"column"}
    alignItems={"center"}
    spacing={"0.5rem"}
    color={"white"}
    textAlign={"center"}>
      {
        icon && icon
      }
      <Typography variant='body1'>{text} </Typography>
      <Typography color={"gray"} variant='caption'>{heading} </Typography>
    </Stack>


export default Profile
