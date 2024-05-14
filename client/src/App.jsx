import React, { lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const Landing = lazy(() => import("./pages/Landing"));

const Login = lazy(() => import("./pages/Login"));

const Groups = lazy(() => import("./pages/Groups"));

const Chat = lazy(() => import("./pages/Chat"));


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/chat/:chatId' element={<Chat />} />
        <Route path='/groups' element={<Groups />} />
        <Route path='/login' element={<Login/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
