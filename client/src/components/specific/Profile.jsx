import { Avatar, Stack, Typography } from '@mui/material';
import React from 'react';
import FaceIcon from '@mui/icons-material/Face';
import NameIcon from '@mui/icons-material/CalendarMonth';
import UserNameIcon from '@mui/icons-material/AlternateEmail';
import moment from 'moment'

const Profile = () => {
  return (
    <Stack spacing={"2rem"} direction={"column"} alignItems={"center"}>
      <Avatar 
        sx={{
          width: "10rem",
          height: "10rem",
          border: "5px solid black",
          objectFit: "contain",
          marginBottom: '1rem',
          boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.5)"
        }}
      >
        <FaceIcon sx={{ width: '100%', height: '100%' }} />
      </Avatar>
      <ProfileCard heading={"Bio"} text={"asdfhbkjjnkjl nklasndjklnadnnn oijaoijsdiofj"} />
      <ProfileCard heading={"Username"} text={"Yashwanth R"} icon={<UserNameIcon />} />
      <ProfileCard heading={"Name"} text={"Siddesh"} icon={<FaceIcon />} />
      <ProfileCard heading={"Joined"} text={moment('2024-01-26T00:00:00.000Z').fromNow()} icon={<NameIcon />} />
    </Stack>
  );
};

const ProfileCard = ({ text, icon, heading }) => (
  <Stack
    direction={"row"}
    alignItems={"center"}
    spacing={"0.5rem"}
    color={"white"}
    textAlign={"center"}
  >
    {icon && icon}
    <Typography color={"gray"} variant='caption'>{heading}</Typography>
    <Typography variant='body1'>{text}</Typography>
   
  </Stack>
);

export default Profile;
