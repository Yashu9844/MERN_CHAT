import { Dialog, DialogTitle, Stack, Typography } from '@mui/material'
import React from 'react'
import { sampleUsers } from '../constatns/sampleData'
import Useritem from '../shared/Useritem'

function AddMemberDialog() {
const addFriendHandler=(id)=>{
    console.log(id,chatId)
}

  return (
    <Dialog open>
        <Stack>
            <DialogTitle>Add Member</DialogTitle>

            <Stack>
                {sampleUsers.length >0 ? (sampleUsers.map((i)=>(
                    <Useritem key={i._id} user={i} handler={addFriendHandler} />
                ))):(
                    <Typography>No Members Found</Typography>
                )}
            </Stack>
        </Stack>
    </Dialog>
  )
}

export default AddMemberDialog
