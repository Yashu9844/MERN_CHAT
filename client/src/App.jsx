import React, { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProtectRoute from './components/styles/auth/ProtectRoute';
import {LayoutLoader} './components/layout/LayoutlLoader'
import { server } from './components/constants/config.js';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { userNotExits, userExits } from './redux/reducers/auth.js';
import { Toaster } from 'react-hot-toast';

import SsignUp from './pages/SsignUp.jsx';

const Landing = lazy(() => import('./pages/Landing'));
const Login = lazy(() => import('./pages/Login'));
const Groups = lazy(() => import('./pages/Groups'));
const Chat = lazy(() => import('./pages/Chat'));
const NotFound = lazy(() => import('./pages/NotFound'));
const AdminLogin = lazy(() => import('./pages/admin/AdminLogin'));
const DashBoard = lazy(() => import('./pages/DashBoard/DashBoard'));
const MessageManagment = lazy(() => import('./pages/admin/MessageManagment'));
const ChatManagment = lazy(() => import('./pages/admin/ChatManagment'));
const ManagmentUser = lazy(() => import('./pages/admin/ManagmentUser'));

const App = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const loader = true;

  useEffect(() => {
    axios
      .get(`${server}/api/user/me`, { withCredentials: true })
      .then(({ data }) => dispatch(userExits(data.user)))
      .catch((err) => dispatch(userNotExits()));
  }, [dispatch]);

  return (
    <>
      <BrowserRouter>
        <Suspense fallback={<LayoutLoader />}>
          <Routes>
            <Route path='/signup' element={<SsignUp />} />
            <Route element={<ProtectRoute user={user} />}>
              <Route path='/' element={<Landing />} />
              <Route path='/chat/:chatId' element={<Chat />} />
              <Route path='/groups' element={<Groups />} />
            </Route>
            <Route
              path='/login'
              element={
                <ProtectRoute user={!user} redirect='/'>
                  <Login />
                </ProtectRoute>
              }
            />
            <Route path='/admin' element={<AdminLogin />} />
            <Route path='/admin/dashboard' element={<DashBoard />} />
            <Route path='/admin/chats' element={<ChatManagment />} />
            <Route path='/admin/messages' element={<MessageManagment />} />
            <Route path='/admin/users' element={<ManagmentUser />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </Suspense>
        <Toaster position='bottom-center' />
      </BrowserRouter>
    </>
  );
};

export default App;
