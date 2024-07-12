import { Avatar, Button, Container, IconButton, Paper, Stack, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { CameraAlt } from '@mui/icons-material';
import { VisuallyHiddenInput } from '../components/styles/StyledComponent';
import { useFileHandler, useInputValidation, useStrongPassword } from '6pp';
import { usernameValidator } from '../utils/validators.js';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { server } from '../components/constatns/config.js';
import { useDispatch } from 'react-redux';
import { userExits } from '../redux/reducers/auth.js';
import toast from 'react-hot-toast';

const LoginPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const dispatch = useDispatch();

  const handleLogin = () => {
    setIsLoggedIn((prev) => !prev);
  };

  const username = useInputValidation("", usernameValidator);
  const password = useStrongPassword("");
  const navigate = useNavigate();

  const handleLoginSubmit = async (e) => {
   
  };

  return (
    <div style={{ backgroundImage: "linear-gradient(rgb(255,255,209),rgb(249,159,159))" }}>
      <Container component={'main'} maxWidth='xs' sx={{ height: '100vh', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Paper elevation={3} sx={{ padding: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <Typography variant='h5'>
            Login
            <form style={{ width: "100%", marginTop: 2 }} onSubmit={handleLoginSubmit}>
              <TextField required fullWidth label="Username" margin='normal' variant='outlined'   />
              <TextField required fullWidth label="password" type='password' margin='normal' variant='outlined'  />
              <Button sx={{ marginTop: 2, width: '100%' }} variant='contained' color='primary' type='submit'>Login </Button>
              <Typography sx={{ textAlign: 'center', marginTop: 2, fontSize: 12, color: '#000000' }}>OR</Typography>
              <Button sx={{ marginTop: 1, width: '100%' }} variant='text' color='secondary' onClick={() => navigate('/signup')}>Sign Up Instead </Button>
            </form>
          </Typography>
        </Paper>
      </Container>
    </div>
  );
};

export default LoginPage;
