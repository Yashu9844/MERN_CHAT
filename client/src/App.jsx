import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProtectRoute from './components/styles/auth/ProtectRoute';
import LayoutlLoader from './components/layout/LayoutlLoader';

const Landing = lazy(() => import("./pages/Landing"));

const Login = lazy(() => import("./pages/Login"));

const Groups = lazy(() => import("./pages/Groups"));

const Chat = lazy(() => import("./pages/Chat"));

const NotFound = lazy(() => import("./pages/NotFound"))


let user =true;


const App = () => {
  return (
    <BrowserRouter>
     <Suspense fallback={<LayoutlLoader/>}>
     <Routes>
        <Route  element={<ProtectRoute user={user}/>}>
        <Route path='/' element={<Landing/>} />
         <Route path='/chat/:chatId' element={<Chat />} />
        <Route path='/groups' element={<Groups />} />
       </Route>
        <Route path='/login' element={<ProtectRoute user={!user} redirect='/'>
          <Login/>
        </ProtectRoute>} />

 <Route path='*' element={<NotFound/>} />

      </Routes>
     </Suspense>
    </BrowserRouter>
  );
};

export default App;
