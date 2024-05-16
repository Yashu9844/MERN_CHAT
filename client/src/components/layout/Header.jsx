import { AppBar, Backdrop, Box, IconButton, Toolbar, Tooltip, Typography } from '@mui/material'
import { orange } from '@mui/material/colors'
import React, { Suspense, lazy, useState } from 'react'
import { Add as AddIcon, Group as GroupIcon, Logout as LogoutIcon, Menu as MenuIcon, Notifications as NotificationsIcon, Search as SearchIcon } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
 
const  SearchDialog = lazy(()=>import('../specific/Search'))
const NotificationDialog = lazy(()=>import('../specific/Notifications'))

const  NewGroupDialog = lazy(()=>import('../specific/NewGroup'))

const Header = () => {

  const [isMobile,setIsMobile] = useState(false);
  const [isSearch,setIsSearch] = useState(false);
  const [isNotification,setNotification] = useState(false);
  const [isNewGroup,setNewGroup] = useState(false);


  const navigate = useNavigate()

  const handleMobile = () => {
    // Logic for handling mobile menu
    setIsMobile((prev) =>!prev)
  }

  const openSearch = () => {
    // Logic for opening search
    setIsSearch((prev) =>!prev)
  }

  const openNewGroup = () => {
    // Logic for opening new group
      setNewGroup((prev) =>!prev)
  }

  const navigateToGroup = () => {
    navigate('/groups')
  }
 const openNotification = ()=>{
   setNotification((prev) =>!prev)
 }
  const handleLogout = () => {

  }

  return (
   <>
    <Box sx={{ flexGrow: 1, height: '4rem' }}>
      <AppBar position='static' sx={{ bgcolor: orange[500] }}>
        <Toolbar>
          <Typography 
            variant='h6' 
            sx={{ display: { xs: 'none', sm: "block" } }}
          >
            Chat App
          </Typography>

          <Box sx={{ display: { xs: 'block', sm: "none" } }}>
            <IconButton color='inherit' onClick={handleMobile}>
              <MenuIcon />
            </IconButton>
          </Box>

          <Box sx={{ flexGrow: 1 }} />

          <Box>
            <IconBtn title="Search" icon={<SearchIcon />} onClick={openSearch} />
            <IconBtn title="New Group" icon={<AddIcon />} onClick={openNewGroup} />
            <IconBtn title="Manage Group" icon={<GroupIcon />} onClick={navigateToGroup} />
            <IconBtn title='Notification' icon={<NotificationsIcon />} onClick={openNotification} />
            <IconBtn title='Logout' icon={<LogoutIcon />} onClick={handleLogout} />
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
     {
      isSearch && (

        <Suspense fallback={<Backdrop open/>}>
          <SearchDialog/>
        </Suspense>
      )
     }
     {
      isNotification && (

        <Suspense fallback={<Backdrop open/>}>
          <NotificationDialog/>
        </Suspense>
      )
     }
     {
      isNewGroup && (

        <Suspense fallback={<Backdrop open/>}>
          <NewGroupDialog/>
        </Suspense>
      )
     }
   
   </>
    
  )
}

const IconBtn = ({ title, icon, onClick }) => {
  return (
    <Tooltip title={title}>
      <IconButton color='inherit' size='large' onClick={onClick}>
        {icon}
      </IconButton>
    </Tooltip>
  )
}

export default Header
