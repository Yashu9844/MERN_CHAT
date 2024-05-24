import { Box, Grid, IconButton, Tooltip } from '@mui/material'
import React from 'react'
import { KeyboardBackspace as KeyboardBackSpaceIcon, Menu as MenuIcon } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'

const Groups = () => {

  const [isMobile,setIsMobile] = useState(false);
  const navigate = useNavigate();
  

  const navigateBack =()=>{
    navigate("/")

0  }

const handleMobile =()=>{
  setIsMobile((prev)=>!prev)


}
  const IconsBtns = () => (
   
   <>
   <Box sx={{
    display:{
      xs:"block",
      sm:"none",
      position:"fixed",
      right:"1rem",
      top:"1rem"
    }
    
   }}>

   <IconButton>
      <MenuIcon onClick={handleMobile}/>
    </IconButton>    
   </Box>
   
    <Tooltip title='black'>
      <IconButton
        sx={{
          position: 'absolute',
          top: "2rem",
          left: "2rem",
          bgcolor:"#1c1c1c",
          color:"white",
          " :hover":{
            bgcolor:"rgba(0,0,0,0.7)"
          }
        }} onClick={navigateBack}>
        <KeyboardBackSpaceIcon />
      </IconButton>
    </Tooltip></>
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
        Group List
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
    </Grid>
  );
}

export default Groups
