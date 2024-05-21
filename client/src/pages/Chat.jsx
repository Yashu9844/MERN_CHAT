
import React, { useRef } from "react";
import AppLayout from "../components/layout/AppLayout";
import { grayColor } from "../components/constatns/color.js"; // Corrected the import path typo
import { IconButton, Stack } from "@mui/material";
import { AttachFile as AttachFileIcon, Send as SendIcon } from "@mui/icons-material";
import { InputBox } from "../components/styles/StyledComponent.jsx";
import { orange } from "@mui/material/colors";
import FileMenu from "../components/dialogs/FileMenu.jsx";
import { sampleMessage } from "../components/constatns/sampleData.js";
import MessageComponent from "../components/shared/MessageComponent.jsx";

const Chat = () => {
    const containerRef = useRef(null);
    const user={
        _id:"asgdhbjwebrukhhgba",
        name:"yashwanthRSiddesh"
    }
    return (
        <>
            <Stack
                ref={containerRef} // Properly placed ref attribute
                boxSizing="border-box"
                padding="1rem"
                spacing="1rem"
                bgcolor={grayColor}
                height="90%"
                sx={{
                    overflow: "hidden",
                    overflowY: "auto",
                }}
            > {
               sampleMessage.map((i)=>(
                <MessageComponent message={i} user={user} />
               ))
            }
            </Stack>
            
            <form 
            style={{
                height:"10%"
            }}>
                <Stack direction={"row"}
                height={"100%"}
                padding={"1rem"}
                alignItems={"center"}
                position={"relative"}
                 >
                    <IconButton 
                     
                    >
                        <AttachFileIcon/>
                    </IconButton>

                    <InputBox placeholder="Type Message Here..."/>

                    <IconButton type="submit" sx={{
                        rotate:"-21deg",
                        bgcolor:"red",
                        color:"white",
                        marginLeft:'1rem',
                        padding:"0.5rem",
                        "&:hover":{
                            bgcolor:"error.dark",
                            
                        }
                    }} >
                        <SendIcon/>
                    </IconButton>
                </Stack>
                
            </form>

            <FileMenu />

        </>
    );
};

export default AppLayout()(Chat);
