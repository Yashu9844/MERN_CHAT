import React from 'react';
import AdminLayout from '../../components/layout/AdminLayout';
import { Box, Container, Paper, Stack, Typography } from '@mui/material';
import { AdminPanelSettings as AdminPanelSettingsIcon, Group as GroupIcon, Person as PersonIcon, Notifications as NotificationIcon, Search, Message as MessageIcon } from '@mui/icons-material';
import moment from 'moment';
import { SearchField, CurveButton } from '../../components/styles/StyledComponent';
import { DoughnutCharts, LineCharts } from '../../components/specific/Charts';


const DashBoard = () => {

  const Widget = ({ title, value, icon }) => {
    return (
      <Paper elevation={3} sx={{ padding: "1rem", borderRadius: "1rem", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: "100%", maxWidth: "15rem" }}>
          <Typography sx={
            {
              color:"rgba(0,0,0,0.7)",
              borderRadius:"50%",
              border:'5px solid rgba(0,0,0,0.9)',
              width:"5rem",
              height:"5rem",
              display:"flex",
              justifyContent:"center",
              alignItems:"center"
            }
          } >{value}</Typography>
        <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
          {icon}
          <Typography variant='h6'>{title}</Typography>
        </Stack>
      
      </Paper>
    );
  };

  const Appbar = (
    <Paper
      elevation={3}
      sx={{ padding: "2rem", margin: "2rem 0", borderRadius: "1rem" }}
    >
      <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
        <AdminPanelSettingsIcon sx={{ fontSize: "3rem" }} />
        <SearchField />
        <CurveButton>
          <Stack direction={"row"} alignItems={"center"} gap={"0.8vw"}>
            Search
            <Search />
          </Stack>
        </CurveButton>
        <Box flexGrow={1} />
        <Typography
          display={{
            xs: "none",
            lg: "block"
          }}
          color={"rgba(0,0,0,0.7)"}
          textAlign={"center"}
        >
          {moment().format('dddd Do MMMM YYYY')}
        </Typography>
        <NotificationIcon />
      </Stack>
    </Paper>
  );

  const Widgets = (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      spacing="2rem"
      justifyContent={"space-between"}
      alignItems={"center"}
      margin={"2rem 0"}
    >
      <Widget title={"Users"} value={345} icon={<PersonIcon />} />
      <Widget title={"Chats"} value={234} icon={<GroupIcon />} />
      <Widget title={"Messages"} value={1234} icon={<MessageIcon />} />
    </Stack>
  );

  return (
    <AdminLayout>
      <Container component={"main"}>
        {Appbar}
        <Stack direction={"row"} spacing={"2rem"} flexWrap={"wrap"}>
          <Paper
            elevation={3}
            sx={{
              padding: "2rem 3.5rem",
              borderRadius: "1rem",
              width: "100%",
              maxWidth: "45rem",
              height: "25rem"
            }}
          >
            <Typography margin={"2rem 0"} variant='h4'>Last messages</Typography>
            <LineCharts/>
          </Paper>
          <Paper
            elevation={3}
            sx={{
              padding: "1rem",
              borderRadius: "1rem",
              width: { xs: "100%", sm: "50%" },
              maxWidth: "25rem",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: 'relative',
              height: "25rem"
            }}
          >
            <DoughnutCharts/>
            <Stack
              position="absolute"
              direction={"row"}
              spacing={"0.5rem"}
              width={"100%"}
              height={"100%"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <GroupIcon />
              <Typography>Vs</Typography>
              <PersonIcon />
            </Stack>
          </Paper>
        </Stack>
        {Widgets}
      </Container>
    </AdminLayout>
  );
};

export default DashBoard;
