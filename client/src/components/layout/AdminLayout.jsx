import { Box, Drawer, Grid, IconButton, Stack, Typography, } from '@mui/material';
import {Close as CloseIcon, Menu as MenuIcon } from '@mui/icons-material'
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

const SideBar = ({w="100%"}) => {
    const location = useLocation();
    return <Stack width={w} direction={"column"} p={"3rem"} spacing={"1rem"}>
       <Typography variant='h5' textTransform={"uppercase"}>Admin</Typography>
       
    </Stack>
  };

const AdminLayout = ({ children }) => {
    const [isMobile,setIsMobile] = useState(false)

 const handleMobile =()=>{
   setIsMobile(!isMobile)
 }
 const handleClose =()=>{
    setIsMobile(false)
 }

  return (

    <Grid container minHeight={'100vh'}>
        <Box 
        sx={{
            display:{xs:"block",md:"none"},
            position:"fixed",
            right:"1rem",
            top:"1rem",
        }}>
            <IconButton onClick={handleMobile}>
           {
            isMobile ? <CloseIcon/> : <MenuIcon/>
           }
            </IconButton>
        </Box>
      <Grid item md={4} lg={3} sx={{ display: { xs: 'none', md: 'block' } }}>
        {/* Render your sidebar or other content here */}
        <SideBar/>
      </Grid>
      <Grid item
      xs={12}
      md={8}
      lg={9}
      sx={{
        bgcolor:"#f5f5f5"
      }}>
        {children}

      </Grid>
    <Drawer open={isMobile} onClose={handleClose}>
        <SideBar w='50vw' />

    </Drawer>


    </Grid>
  );
};


export default AdminLayout;
