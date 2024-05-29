import { Box, Drawer, Grid, IconButton, Stack, Typography } from '@mui/material';
import { Close as CloseIcon, Menu as MenuIcon } from '@mui/icons-material';
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Dashboard as DashBoardIcon, ManageAccounts as ManageAccountsIcon, Groups as GroupsIcon, Message as MessageIcon, ExitToApp as ExitToAppIcon } from '@mui/icons-material';
import { Link } from '../styles/StyledComponent';

const adminTabs = [
  {
    name: "DashBoard",
    path: "/admin/dashboard",
    icon: <DashBoardIcon />
  },
  {
    name: "Users",
    path: "/admin/users", // Corrected the path typo
    icon: <ManageAccountsIcon />
  },
  {
    name: "Chats",
    path: "/admin/chats",
    icon: <GroupsIcon />
  },
  {
    name: "Messages",
    path: "/admin/messages",
    icon: <MessageIcon />
  }
];

const SideBar = ({ w = "100%" }) => {
  const location = useLocation();
  const logOutHandler = () => {
    // Logic for logging out
  };

  return (
    <Stack width={w} direction={"column"} p={"3rem"} spacing={"1rem"}>
      <Typography variant='h5' textTransform={"uppercase"}>Admin</Typography>
      <Stack spacing={"1rem"}>
        {adminTabs.map((tab) => (
          <Link
            key={tab.path}
            to={tab.path}
            sx={{
              ...(location.pathname === tab.path && {
                bgcolor: "rgb(0,0,0)",
                color: "white",
                ":hover": { color: "white" },
                padding: "1rem",
                borderRadius: "50px"
              })
            }}
          >
            <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
              {tab.icon}
              <Typography>{tab.name}</Typography>
            </Stack>
          </Link>
        ))}
        <Link onClick={logOutHandler} sx={{ cursor: 'pointer' }}> {/* Added cursor pointer */}
          <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
            <ExitToAppIcon /> {/* Corrected the icon usage */}
            <Typography>Logout</Typography>
          </Stack>
        </Link>
      </Stack>
    </Stack>
  );
};

const AdminLayout = ({ children }) => {
  const [isMobile, setIsMobile] = useState(false);

  const handleMobile = () => {
    setIsMobile(!isMobile);
  };

  const handleClose = () => {
    setIsMobile(false);
  };

  return (
    <Grid container minHeight={'100vh'}>
      <Box
        sx={{
          display: { xs: "block", md: "none" },
          position: "fixed",
          right: "1rem",
          top: "1rem",
        }}>
        <IconButton onClick={handleMobile}>
          {isMobile ? <CloseIcon /> : <MenuIcon />}
        </IconButton>
      </Box>
      <Grid item md={4} lg={3} sx={{ display: { xs: 'none', md: 'block' } }}>
        <SideBar />
      </Grid>
      <Grid item
        xs={12}
        md={8}
        lg={9}
        sx={{
          bgcolor: "#f5f5f5"
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
