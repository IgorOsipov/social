import { useEffect, useState } from 'react';
import { Badge, Paper, Divider, Fab } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import Messages from './Messages/Messages';
import InputMessage from './InputMessage/InputMessage';

const ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx');

export type ChatMessageType = {
    message: string
    photo: string
    userId: number
    userName: string
}

const Chat = () => {

    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<ChatMessageType[]>([]);

    const onChatButtonClick = () => {
        setIsOpen(!isOpen);
    }

    const sendMessage = (newMessage: string) => {
        ws.send(newMessage);
    }

    useEffect(() => {
        ws.addEventListener('message', (e: MessageEvent) => {
            const newMessage = JSON.parse(e.data);
            setMessages((prevMessages) => [...prevMessages, ...newMessage]);
        });
    },[]);

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
                <Messages messages={messages} />
                <Divider />
                <InputMessage sendMessage={sendMessage} />
            </Paper>}
            <Fab
                size="large"
                color="primary"
                onClick={onChatButtonClick}
                sx={{
                    position: 'fixed',
                    right: 50,
                    bottom: 30,
                }}
            >
                <Badge badgeContent={0} color="error">
                    <ChatIcon />
                </Badge>
            </Fab>
        </>
    )
}

export default Chat;