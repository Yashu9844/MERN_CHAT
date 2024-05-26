import { Button, Dialog, DialogTitle, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'
import { sampleUsers } from '../constatns/sampleData'
import Useritem from '../shared/Useritem'

function AddMemberDialog({chatId,isLoadingAddMember,addMember}) {
 
    const [members, setMembers] = useState(sampleUsers);
    const [selectMembers, setSelectMembers] = useState([]);


    const selectMemberHandler = (id) => {
        setSelectMembers((prev) =>
            prev.includes(id)
                ? prev.filter((currElem) => currElem !== id)
                : [...prev, id]
        );
    };


 const addMemberSubmitHandler=()=>{
    closeHandler()
 }   
 const closeHandler=()=>{
    setSelectMembers([])
    setMembers([]);
    }  


  return (
    <Dialog open onClose={closeHandler}>
        <Stack p={"2rem "} width={"20rem"} spacing={"2rem"}>
            <DialogTitle textAlign={"center"}>Add Member</DialogTitle>

            <Stack textAlign={"center"} >
                {members.length >0 ? (members.map((i)=>(
                    <Useritem key={i._id} user={i} handler={selectMembers} isAdded={selectMembers
                        .includes(i._id)
                    }/>
                ))):(
                    <Typography>No Members Found</Typography>
                )}
            </Stack>
          <Stack direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}>
          <Button color='error' onClick={closeHandler}>Cancel</Button>
          <Button onClick={addMemberSubmitHandler}  variant="contained" disabled={isLoadingAddMember}>Submit changes</Button>
          </Stack>
        </Stack>
    </Dialog>
  )
}

export default AddMemberDialog
