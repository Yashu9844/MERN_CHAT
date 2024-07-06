import { Avatar, Button, Container, IconButton, Paper, Stack, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import {CameraAlt} from '@mui/icons-material'
import { VisuallyHiddenInput } from '../components/styles/StyledComponent'
import {useFileHandler, useInputValidation,useStrongPassword} from '6pp'
import { usernameValidator } from '../utils/validators.js'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { server } from '../components/constatns/config.js'
import { useDispatch } from 'react-redux'
import { userExits } from '../redux/reducers/auth.js'

const Login = () => {
  const [isLoggedIn,setIsLoggedIn] = useState(true)
  const dispatch = useDispatch()

  const handleLogin = () => {
    setIsLoggedIn((prev) => !prev)
  }

  const name = useInputValidation("")
  const bio = useInputValidation("")
  const username = useInputValidation("",usernameValidator)
  const password = useStrongPassword("")
  const avatar = useFileHandler("single")
 const navigate = useNavigate()
  const  handleLoginSubmit= async (e)=>{
    e.preventDefault()

   try {
const {data} =   await   axios.post(`${server}/api/user/login`,{
       username:username.value,
       password:password.value
     },{
       withCredentials:true,
       headers:{
         'Content-Type': 'application/json'
       }
     })
     dispatch(userExits(true))
   } catch (error) {
    console.error(error)
   }
 
  }

  const handleSignUp = async(e)=>{
    e.preventDefault()

  }

  return(
 <div style={{
  backgroundImage:"linear-gradient(rgb(255,255,209),rgb(249,159,159))",
 }}>
   
   <Container component={'main'} maxWidth='xs'
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
              marginTop:2            }} 
              onSubmit={handleLoginSubmit}>
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
              marginTop:2            }} onSubmit={handleSignUp}  >
                
               <Stack position={"relative"} width={"10rem"} margin={'auto'}
              
               >
              <Avatar sx={{
                objectFit:'contain',
                width:'10rem',
                height:'10rem'              }}
                src={avatar.preview}/>
               {
                avatar.error && (
                  <Typography color='error' variant='caption'>
                    {avatar.error}
                  </Typography>
                )
               }




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
                  <VisuallyHiddenInput type='file' onChange={avatar.changeHandler}/>
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
              /> 
              
              
              <TextField 
              required
              fullWidth
              label="Username"
              margin='normal'
              variant='outlined'
              value={username.value}
              onChange={username.changeHandler}
             />  

               {
                username.error && (
                  <Typography color='error' variant='caption'>
                    {username.error}
                  </Typography>
                )
               }

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
              {
                password.error && (
                  <Typography color='error' variant='caption'>
                    {password.error}
                  </Typography>
                )
               }
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
 </div>)
  
}

export default Login
