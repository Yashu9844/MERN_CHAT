import React from 'react'
import AdminLayout from '../../components/layout/AdminLayout'
import { Box, Container, Paper, Stack, Typography } from '@mui/material'
import { AdminPanelSettings as AdminPanelSettingsIcon, Notifications as NotificationIcon, Search} from '@mui/icons-material'
import moment  from 'moment'
import { SearchField } from '../../components/styles/StyledComponent'
import { CurveButton } from '../../components/styles/StyledComponent'
const DashBoard = () => {
const Appbar = <Paper  elevation={3}
sx={{padding:"2rem" , margin:"2rem 0",borderRadius:"1rem"}}
>
<Stack  direction={"row"} alignItems={"center"} spacing={"1rem"} >

  <AdminPanelSettingsIcon  sx={{fontSize:"3rem"}}/>
<SearchField/>

<CurveButton><Stack direction={"row"} alignItems={"center"} gap={"0.8vw"}>
  Search
  <Search/>
  
  </Stack></CurveButton>
  
  <Box flexGrow={1} />
<Typography display={{
  xs:"none",
  lg:"block"
}}
color={"rgba(0,0,0,0.7)"}
textAlign={"center"}>{moment().format('dddd Do MMMM YYYY')}</Typography>
<NotificationIcon/>

</Stack>
</Paper>



  return (
    <AdminLayout>
       <Container component={"main"} >
        {Appbar}
       </Container>
    </AdminLayout>
  )
}

export default DashBoard
