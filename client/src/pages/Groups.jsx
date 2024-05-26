import {
    Backdrop,
    Box,
    Button,
    Drawer,
    Grid,
    IconButton,
    Stack,
    TextField,
    Tooltip,
    Typography,
} from "@mui/material";
import React, { Suspense, lazy, memo, useEffect, useState } from "react";
import {
    Add as AddIcon,
     Delete as DeleteIcon,
     Done as DoneIcon,
    Edit as EditIcon,
    KeyboardBackspace as KeyboardBackSpaceIcon,
    Menu as MenuIcon,
} from "@mui/icons-material";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Link } from "../components/styles/StyledComponent";

import { sampleChats } from "../components/constatns/sampleData";
import AvatarCard1 from "../components/specific/AvatarCard1";
const ConfirmDeleteDialog = lazy(()=>import("../components/dialogs/ConfirmDeleteDialog"))
 
const AddMemberDialog  = lazy(()=>import("../components/dialogs/AddMemberDialog"))

const Groups = () => {
    const navigate = useNavigate();
    const chatId = useSearchParams()[0].get("group");
    const [isMobile, setIsMobile] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
  const [groupName,setGroupName] = useState("");
  const [groupNameUpdated,setGroupNameUpdated] = useState("");
  const [confirmDeleteDialog,setConfirmDeleteDialog] = useState(false);

    
  
  useEffect(()=>{ 
      setGroupName(`Group Name ${chatId} `);
      setGroupNameUpdated(`Group Name 2 ${chatId} `)

      return ()=>{
         setGroupName("");
         setGroupNameUpdated("");
         setIsEdit(false)
      }
    },[chatId])


const handleDelete=()=>{
    console.log("delete")
    closeDeletehandler();

}


const closeDeletehandler = ()=>{
    setConfirmDeleteDialog(true);
}

  const confirmDeleteMembers=()=>{
    console.log("delete")
    setConfirmDeleteDialog(true);
  }
   const openAddMembers = ()=>{
     console.log("Add members");
     
   }
 
   const navigateBack = () => {
    navigate("/");
};

const handleMobileClose = () => {
    setIsMobile(false);
};

const handleMobile = () => {
    setIsMobile((prev) => !prev);
};

const isAddmember = false;

const updateGroupName = ()=>{
  setIsEdit(false);
  console.log(groupNameUpdated)
}

    const ButtonGroup = <Stack direction={{
        sm:"row",
        xs:"column"
    }} spacing={"1rem"}
    p={{
        sm:"1rem",
        xs:"1rem",
        md:"1rem 4rem"
    }}
    justifyContent={"center"}>
        <Button size="large" variant="contained" startIcon={<AddIcon/>} onClick={openAddMembers}>Add People</Button>
    <Button size="large" color="error" startIcon={<DeleteIcon/>} onClick={confirmDeleteMembers}>Delete People </Button>
    
    
    
    </Stack>

    

    const GroupName = (
        <>
            <Stack
                direction={"row"}
                alignItems={"center"}
                justifyContent={"center"}
                spacing={"1rem"}
                padding={"3rem"}
            >
                {isEdit ? (
                    (
                      <>
                      <TextField value={groupNameUpdated} onChange={(e)=>setGroupNameUpdated(e.target.value)}/>
                      <IconButton onChange={updateGroupName}>
                        <DoneIcon/>
                      </IconButton>
                      </>
                    )
                ) : (
                    <>
                        <Typography variant="h4">{groupName}</Typography>
                        <IconButton onClick={() => setIsEdit(true)}>
                            <EditIcon />
                        </IconButton>
                    </>
                )}
            </Stack>
        </>
    );

    const IconsBtns = () => (
        <>
            <Box
                sx={{
                    display: {
                        xs: "block",
                        sm: "none",
                        position: "fixed",
                        right: "1rem",
                        top: "1rem",
                    },
                }}
            >
                <IconButton onClick={handleMobile}>
                    <MenuIcon />
                </IconButton>
            </Box>

            <Tooltip title="Back">
                <IconButton
                    sx={{
                        position: "absolute",
                        top: "2rem",
                        left: "2rem",
                        bgcolor: "#1c1c1c",
                        color: "white",
                        ":hover": {
                            bgcolor: "rgba(0,0,0,0.7)",
                        },
                    }}
                    onClick={navigateBack}
                >
                    <KeyboardBackSpaceIcon />
                </IconButton>
                {groupName && (
                    <>
                    {GroupName}
                    <Typography
                    margin={"2rem"}
                    alignSelf={"flex-start"}
                    variant="body1"
                    >Members</Typography>
                     <Stack 
                     maxWidth={"45rem"}
                     width={"100%"}
                     boxSizing={"border-box"}
                     padding={{
                        sm:"1rem",
                        xs:"0",
                        md:"1rem 4rem",
                     }}
                     spacing={"2rem"}
                     bgcolor={"bisque"}
                     height={"50vh"}
                     overflow={'auto'}
                     >


                      {/* members */}

                     </Stack>
                    
                     {ButtonGroup}


                   
                    </>

                 
                    
                )}
            </Tooltip>
        </>
    );

    return (
        <Grid container height={"100vh"}>
            <Grid
                item
                sx={{
                    display: {
                        xs: "none",
                        sm: "block",
                    },
                }}
                sm={4}
                bgcolor={"bisque"}
            >
                <GroupLists myGroups={sampleChats} chatId={chatId} />
            </Grid>
            <Grid
                item
                xs={12}
                sm={8}
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    position: "relative",
                    padding: "1rem 3rem",
                }}
            >
                <IconsBtns />
            </Grid>
          {isAddmember && 
          (<Suspense fallback={<Backdrop open />} >
            <AddMemberDialog/>
          </Suspense>)}



           {
            confirmDeleteDialog && <>
           (
            <Suspense fallback={<Backdrop open/>}>
            <ConfirmDeleteDialog  open={confirmDeleteDialog}  handleClose={closeDeletehandler} deleteHandler={
                handleDelete
            }  />
            </Suspense>
           )</>
           }

            <Drawer
                open={isMobile}
                onClick={handleMobileClose}
                sx={{
                    display: {
                        xs: "block",
                        sm: "none",
                    },
                }}
            >
                <GroupLists
                    width={"50vw"}
                    myGroups={sampleChats}
                    chatId={chatId}
                />
            </Drawer>
        </Grid>
    );
};

const GroupLists = ({ width = "100%", myGroups = [], chatId }) => (
    <Stack width={width}>
        {myGroups.length > 0 ? (
            myGroups.map((group) => (
                <GroupListItem
                    group={group}
                    key={group._id}
                    currentChatId={chatId}
                />
            ))
        ) : (
            <Typography textAlign={"center"}>No group</Typography>
        )}
    </Stack>
);

const GroupListItem = memo(({ group, chatId }) => {
    const { name, avatar, _id } = group;

    return (
        <Link
            to={`?group=${_id}`}
            onClick={(e) => {
                if (chatId === _id) e.preventDefault();
            }}
        >
            <Stack
                direction={"row"}
                spacing={"1rem"}
                alignItems={"center"}
                sx={{
                    padding: "3vw",
                }}
            >
                <AvatarCard1 avatar={avatar} />
                <Typography>{name}</Typography>
            </Stack>
        </Link>
    );
});

export default Groups;
