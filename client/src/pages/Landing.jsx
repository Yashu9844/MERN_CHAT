import React from "react";
import AppLayout from "../components/layout/AppLayout";
import { Box, Typography } from "@mui/material";

const Landing = () => {
    return (
        <Box bgcolor={"0,0,0,0.1"} height={"100%"}>
            <Typography p={"2rem"} variant="h5" textAlign={"center"}>
                Select a friend to Chat
            </Typography>
        </Box>
    );
};

export default AppLayout()(Landing);
