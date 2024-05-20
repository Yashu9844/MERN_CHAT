import {
    Avatar,
    Button,
    Dialog,
    DialogTitle,
    IconButton,
    ListItem,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import React, { memo, useState } from "react";
import { sampleUsers } from "../constatns/sampleData.js";
import Useritem from "../shared/Useritem.jsx";
import { useInputValidation } from "6pp";

const NewGroup = () => {
    const [members, setMembers] = useState(sampleUsers);
    const [selectMembers, setSelectMembers] = useState([]);
    const groupName = useInputValidation("");

    const selectMemberHandler = (id) => {
        setSelectMembers((prev) =>
            prev.includes(id)
                ? prev.filter((currElem) => currElem !== id)
                : [...prev, id]
        );
    };

    const submitHandler = () => {};

    const closeHandler = () => {};
    return (
        <Dialog open onClose={closeHandler}>
            <Stack
                p={{
                    xs: "1rem",
                    sm: "3rem",
                }}
                width={"25rem"}
                spacing={"2rem"}
                sx={{
                    textAlign: "center",
                }}
            >
                <DialogTitle textAlign={"center"} variant="h4">
                    New Group
                </DialogTitle>
                <TextField
                    label="Group Name"
                    value={groupName.value}
                    onChange={groupName.changeHandler}
                />
                <Typography variant="body1">Members</Typography>

                <Stack>
                    {sampleUsers.map((user) => (
                        <Useritem
                            user={user}
                            key={user._id}
                            handler={selectMemberHandler}
                            isAdded={selectMembers.includes(user._id)}
                        />
                    ))}
                </Stack>
                <Stack
                    justifyContent={"space-evenly"}
                    direction={"row"}
                    gap={"1rem"}
                    marginTop={"1rem"}
                >
                    <Button
                        size="large"
                        variant="contained"
                        onSubmit={submitHandler}
                    >
                        Create
                    </Button>
                    <Button size="large" variant="text" color="error">
                        Cancel
                    </Button>
                </Stack>
            </Stack>
        </Dialog>
    );
};

export default NewGroup;
