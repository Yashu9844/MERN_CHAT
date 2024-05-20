
import React, { useRef } from "react";
import AppLayout from "../components/layout/AppLayout";
import { grayColor } from "../components/constatns/color.js"; // Corrected the import path typo
import { Stack } from "@mui/material";

const Chat = () => {
    const containerRef = useRef(null);
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
            >
                {/* Content can go here */}
            </Stack>
            
        </>
    );
};

export default AppLayout()(Chat);
