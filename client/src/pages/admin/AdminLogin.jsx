
import { Button, Container, Paper,  TextField, Typography } from '@mui/material'
import React, { useState } from 'react'


import {useFileHandler, useInputValidation,useStrongPassword} from '6pp'

import { Navigate } from 'react-router-dom'


const isAdmin = true
const AdminLogin = () => {



    const secretKey = useInputValidation("")





    const  handleLoginSubmit= async (e)=>{
        e.preventDefault()
    
      }


      if(isAdmin) return <Navigate to={'/admin/dashboard'} />
  return (
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
                
                <>
                <Typography variant='h5'>
                  Admin Login
                  <form style={{
                    width:"100%",
                    marginTop:2            }} 
                    onSubmit={handleLoginSubmit}>
                       
                       
                     <TextField 
                     required
                     fullWidth
                     label="secretKey"
                     type='password'
                     margin='normal'
                     variant='outlined'
                     value={secretKey.value}
                     onChange={secretKey.changeHandler}
                    />   
                   <Button sx={{
                     marginTop:2,
                     width:'100%'
                   }}  variant='contained' color='primary' type='submit'>Login </Button>


                  </form>
                  </Typography></>
                

            }
      
          </Paper>
      
      
        </Container>
       </div>
  )
}

export default AdminLogin
