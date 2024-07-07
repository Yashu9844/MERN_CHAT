import React, { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProtectRoute from './components/styles/auth/ProtectRoute';
import LayoutlLoader from './components/layout/LayoutlLoader';
import { server } from './components/constatns/config.js';
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';
import { userNotExits,userExits } from './redux/reducers/auth.js';
import {Toaster} from 'react-hot-toast'

const Landing = lazy(() => import("./pages/Landing"));

const Login = lazy(() => import("./pages/Login"));

const Groups = lazy(() => import("./pages/Groups"));

const Chat = lazy(() => import("./pages/Chat"));

const NotFound = lazy(() => import("./pages/NotFound"))

const AdminLogin = lazy(() => import("./pages/admin/AdminLogin"))

const DashBoard = lazy(() => import("./pages/DashBoard/DashBoard"))

const MessageManagment = lazy(() => import("./pages/admin/MessageManagment"))

const ChatManagment = lazy(()=> import("./pages/admin/ChatManagment"))



const ManagmentUser = lazy(()=> import("./pages/admin/ManagmentUser"))



let user =true;


const App = () => {
  const { user, loader } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${server}/api/user/me`, {
          withCredentials: true, // Ensure credentials are sent with the request
        });
        console.log(res);
        dispatch(userExits(res.data)); // Dispatch the user data to the store
      } catch (err) {
        console.error(err);
        dispatch(userNotExits());
      }
    };

    fetchUser();
  }, [dispatch]);

  return loader ? (
    <LayoutlLoader />
  ) : (
    <BrowserRouter>
      <Suspense fallback={<LayoutlLoader />}>
        <Routes>
          <Route element={<ProtectRoute user={user} />}>
            <Route path='/' element={<Landing />} />
            <Route path='/chat/:chatId' element={<Chat />} />
            <Route path='/groups' element={<Groups />} />
          </Route>
          <Route path='/login' element={<ProtectRoute user={!user} redirect='/'>
            <Login />
          </ProtectRoute>} />
          <Route path='/admin' element={<AdminLogin />} />
          <Route path='/admin/dashboard' element={<DashBoard />} />
          <Route path='/admin/chats' element={<ChatManagment />} />
          <Route path='/admin/messages' element={<MessageManagment />} />
          <Route path='/admin/users' element={<ManagmentUser />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Suspense>
      <Toaster position="bottom-center" />
    </BrowserRouter>
  );
};

export default App;
