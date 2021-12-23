import { Box, IconButton, TextField } from "@mui/material";
import { useFormik } from "formik";
import SendIcon from '@mui/icons-material/Send';

type PropsType = {
    sendMessage: (newMessage: string) => void
}

const InputMessage: React.FC<PropsType> = ({sendMessage}) => {

    const formik = useFormik({
        initialValues: {
            message: ''
        },
        onSubmit: (values) => {
            if(!values.message) return;
            sendMessage(values.message);
            formik.values.message = '';
        }
    });

    return (

        <Box
            component="form"
            sx={{
                display: "flex",
                alignItems: "flex-end",
                p: '.5rem',
                pl: '1rem'
            }}
            onSubmit={formik.handleSubmit}
        >
            <TextField
                name="message"
                value={formik.values.message}
                onChange={formik.handleChange}
                variant="standard"
                label="Your Message"
                autoComplete="off"
                sx={{
                    flexGrow: "1",
                    pb: ".1rem",
                    mr: ".3rem"
                }}
                
            />
            <IconButton type="submit">
                <SendIcon
                    color="info"
                />
            </IconButton>
        </Box>
    )
}

export default InputMessage;