import { Dialog, DialogTitle, InputAdornment, List, ListItemText, Stack, TextField } from '@mui/material'
import React, { useState } from 'react'
import {useInputValidation } from '6pp'
import { Search as SearchIcon } from '@mui/icons-material'

import Useritem from '../shared/Useritem'
import { sampleUsers } from '../constatns/sampleData.js'
const Search = () => {

  const [users,setUsers] = useState(sampleUsers)
  const search = useInputValidation("")
  let  isLoadingSendFriendRequest = false;

 const addFriendHandler =(id)=>{
  console.log(id)

 }


  return <Dialog open>
    <Stack p={"2rem"} direction={"column"}  width={"25rem"} >
      <DialogTitle textAlign={"center"}> Find People</DialogTitle>
      <TextField label=''  value={search.value} onChange={search.changeHandler} variant='outlined' size='small' InputProps={{
        startAdornment: (
          <InputAdornment position='start'>
            <SearchIcon />
          </InputAdornment>
        )
      }} />
      <List>
           {
            users.map((user)=>(
              <Useritem user={user} key={user._id} 
               handler={addFriendHandler}  
               handlerIsLoading={isLoadingSendFriendRequest}
               />
            ))
           }
      </List>
       

    </Stack>
  </Dialog>
}

export default Search
