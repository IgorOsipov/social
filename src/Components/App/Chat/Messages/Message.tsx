import { Avatar, Box, Typography } from "@mui/material";
import React from "react";
import { ChatMessageType } from "../Chat";

type PropsType = {
  message: ChatMessageType;
};

const Message: React.FC<PropsType> = ({ message }) => {
  return (
    <Box
      color="#eee"
      maxWidth="90%"
      sx={{
        display: "flex",
      }}
    >
      <Avatar alt={message.userName} src={message.photo} sx={{}} />
      <Typography
        sx={{
          flexGrow: "1",
          ml: ".5rem",
          p: ".5rem",
          backgroundColor: "primary.main",
          borderRadius: 2,
        }}
      >
        {message.message}
      </Typography>
    </Box>
  );
};

export default Message;
