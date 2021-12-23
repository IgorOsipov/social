import { useState } from 'react';
import { Badge, Paper, IconButton, Divider } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import Messages from './Messages/Messages';
import InputMessage from './InputMessage/InputMessage';


const Chat = () => {

    const [isOpen, setIsOpen] = useState(false);

    const onChatButtonClick = () => {
        setIsOpen(!isOpen);
    }

    return (
        <>
            {isOpen && <Paper
                elevation={3}
                sx={{
                    position: 'fixed',
                    right: 50,
                    bottom: 100,
                    height: 500,
                    width: 400,
                    display: "flex",
                    flexDirection: "column"
                }}
            >
                <Messages />
                <Divider />
                <InputMessage />
            </Paper>}
            <IconButton
                onClick={onChatButtonClick}
                sx={{
                    position: 'fixed',
                    backgroundColor: 'info.main',
                    right: 50,
                    bottom: 40,
                    height: 50,
                    width: 50,
                    boxShadow: '0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)',
                    '&:hover': {
                        backgroundColor: 'primary.main'
                    }
                }}
            >
                <Badge badgeContent={4} color="error">
                    <ChatIcon sx={{ color: '#fff' }} />
                </Badge>
            </IconButton>
        </>
    )
}

export default Chat;