import React from 'react'
import Header from './Header'
import Footer from './Footer'
import Title from '../shared/Title'
import {Grid} from '@mui/material'

const AppLayout = () =>(WrappedComponent)=>{
return (props)=>{
    return (
        <div>
            <Title title={'Chat App'}/>
           <Header/>
            <Grid container height={"calc(100vh - 4rem)"}>
               <Grid item  height={"100%" } 
               sm={4} md={3} sx={{
                display:{ xs: 'none' ,sm:'block'}
               }}  >Frist</Grid>
               <Grid item xs={12} sm={8} md={5} lg={6} height={"100%" } > <WrappedComponent {...props}/></Grid>
               <Grid item md={4} lg={3} sx={{
                display:{ xs: 'none' ,md:'block'},
                   padding:'2rem',
                   bgcolor:'rgba(0,0,0,0.85)' 
                
               }} height={"100%" } >Third</Grid>
            </Grid>
                

           
            <Footer/>
        </div>
      )
}

  
}

export default AppLayout
