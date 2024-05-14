import { Avatar, Button, Container, IconButton, Paper, Stack, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import {CameraAlt} from '@mui/icons-material'
import { VisuallyHiddenInput } from '../components/styles/StyledComponent'
import {useInputValidation} from '6pp'


const Login = () => {
  const [isLoggedIn,setIsLoggedIn] = useState(true)

  const handleLogin = () => {
    setIsLoggedIn((prev) => !prev)
  }

  const name = useInputValidation("")
  const bio = useInputValidation("")
  const username = useInputValidation("")
  const password = useInputValidation("")
  return <Container component={'main'} maxWidth='xs'
  sx={{
    height: '100vh',
    width: '100%',
    display: 'flex',
    
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: '#f5f5f5',
  }}
  >
    <Paper elevation={3} sx={{
      padding:4,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
     
    }}>

      {
          isLoggedIn?
          <>
          <Typography variant='h5'>
            Login
            <form style={{
              width:"100%",
              marginTop:2            }} >
               <TextField 
               required
               fullWidth
               label="Username"
               margin='normal'
               variant='outlined'
               value={username.value}
               onChange={username.changeHandler}
              />   
                 
               <TextField 
               required
               fullWidth
               label="password"
               type='password'
               margin='normal'
               variant='outlined'
               value={password.value}
               onChange={password.changeHandler}
              />   
             <Button sx={{
               marginTop:2,
               width:'100%'
             }}  variant='contained' color='primary' type='submit'>Login </Button>
              <Typography sx={{
                textAlign: 'center',
                marginTop:2,
                
                fontSize:12,
                color:'#000000'
              }}>OR</Typography>
              <Button sx={{
                marginTop:1,
                width:'100%'
              }}  variant='text' color='secondary' onClick={handleLogin}>Sign Up Instead </Button>
            </form>
            </Typography></>
          :
          <>
          <Typography variant='h5'>
            Sign up
            <form style={{
              width:"100%",
              marginTop:2            }} >
                
               <Stack position={"relative"} width={"10rem"} margin={'auto'}
              
               >
              <Avatar sx={{
                objectFit:'contain',
                width:'10rem',
                height:'10rem'              }}/>
                <IconButton
                sx={{
                  position:'absolute',
                  right:0,
                  bottom:0,
                  color:"white",
                  bgcolor:"rgba(0,0,0,0.5) ",
                  ":hover":{
                    bgcolor:"rgba(0,0,0,0.7) "
                  }
                }}
                component='label'>
                  <>
                  <CameraAlt/>
                  <VisuallyHiddenInput type='file'/>
                  </>
                </IconButton>

               </Stack>



                 <TextField 
               required
               fullWidth
               label="Name"
               margin='normal'
               
               variant='outlined'
               value={name.value}
               onChange={name.changeHandler}
              /> 
                 <TextField 
               required
               fullWidth
               label="Bio"
               margin='normal'
               value={bio.value}
               onChange={bio.changeHandler}
               variant='outlined'
              /> <TextField 
              required
              fullWidth
              label="Username"
              margin='normal'
              variant='outlined'
              value={username.value}
              onChange={username.changeHandler}
             />  
               <TextField 
               required
               fullWidth
               label="password"
               type='password'
               margin='normal'
               variant='outlined'
               value={password.value}
               onChange={password.changeHandler}
              />   
             <Button sx={{
               marginTop:2,
               width:'100%'
             }}  variant='contained' color='primary' type='submit'>Login </Button>
              <Typography sx={{
                textAlign: 'center',
                marginTop:2,
                
                fontSize:12,
                color:'#000000'
              }}>OR</Typography>
              <Button sx={{
                marginTop:1,
                width:'100%'
              }}  variant='text' color='secondary' onClick={handleLogin}>Login  Instead </Button>
            </form>
            </Typography></>
      }

    </Paper>


  </Container>
  
}

export default Login
