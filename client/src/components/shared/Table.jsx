import { Container, Paper, Typography } from '@mui/material'
import React from 'react'
import {DataGrid} from '@mui/x-data-grid'
const Table = ({rows,columns,heading,rowHeight =52}) => {
  return (<Container sx={{ height:"100vh"}} >
    <Paper elevation={3}
    sx={{
        padding:"2rem 4rem",
        borderRadius:"1rem",
        width:"100%",
        maxWidth:"45rem",
        margin:"auto",
        height:"100%",
        overflow:"hidden",
    }}>
        <Typography textAlign={"center"} 
                     variant='h4'
                     sx={{
                        margin:"2rem",
                        textTransform:"uppercase"
                     }}>
                        {heading}

                     </Typography>
                     <DataGrid rows={rows} columns={columns} rowHeight={rowHeight} style={{
                        height:"80%"
                     }}
                     sx={{
                        border:"none",
                        ".table-header":{
                            bgcolor:"black",
                            color:"white",
                            
                        }
                     }} />
    </Paper>
    

  </Container>)
}

export default Table
