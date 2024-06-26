import React from 'react'
import Header from './Header'
import Footer from './Footer'
import Title from '../shared/Title'
import {Grid} from '@mui/material'
import Chatlist from '../specific/Chatlist'
import { sampleChats } from '../constatns/sampleData.js'
import { useParams } from 'react-router-dom'
import Profile from '../specific/Profile.jsx'

const AppLayout = () =>(WrappedComponent)=>{

return (props)=>{
    const params = useParams()
    const chatId= params.chatId
    const handleDeleteChat = (e,_id,groupChat)=>{
        e.preventDefault();
        console.log("Delete chat ",_id ,groupChat)
    }
    return (
        <div>
            <Title title={'Chat App'}/>
           <Header/>
            <Grid container height={"calc(100vh - 4rem)"}>
               <Grid item  height={"100%" } 
               sm={4} md={3} sx={{
                display:{ xs: 'none' ,sm:'block'}
               }}  > <Chatlist chats={sampleChats} chatId={chatId} 
               handleDeleteChat={handleDeleteChat}/></Grid>
               <Grid item xs={12} sm={8} md={5} lg={6} height={"100%" } > <WrappedComponent {...props}/></Grid>
               <Grid item md={4} lg={3} sx={{
                display:{ xs: 'none' ,md:'block'},
                   padding:'2rem',
                   bgcolor:'rgba(0,0,0,0.85)' 
                
               }} height={"100%" } ><Profile/></Grid>
            </Grid>
                

           
            <Footer/>
        </div>
      )
}

  
}

export default AppLayout
