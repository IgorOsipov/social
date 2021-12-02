import React from 'react';

type PropsType = {
    message: string | null
}

const Message: React.FC<PropsType> = (props) => {
    return (
        <li>{props.message}</li>
    )
}

export default Message;