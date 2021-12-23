import { Box } from "@mui/material";
import React from "react";
import { ChatMessageType } from "../Chat";
import Message from "./Message";

type PropsType = {
    messages: Array<ChatMessageType>
}

const Messages: React.FC<PropsType> = ({ messages }) => {
    return (
        <Box
            sx={{
                flexGrow: 1,
                p: "1rem",
                overflowY: "auto",
                '&::-webkit-scrollbar': {
                    WebkitAppearance: 'none',
                    '&:vertical': {
                        width: 8
                    },
                    '&:horizontal': {
                        height: 8
                    }
                },
                '&::-webkit-scrollbar-thumb': {
                    backgroundColor: 'rgba(0, 0, 0, .5)',
                    borderRadius: 6,
                    border: '2px solid #ffffff'
                },
            }}
        >
            { messages.map((message, index) => <Message key={index} message={message} />) }

        </Box>
    )
}

export default Messages;