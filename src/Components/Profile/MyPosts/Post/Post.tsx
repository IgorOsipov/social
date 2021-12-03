import React from 'react';

type PropsType = {
    message: string
}

const Post: React.FC<PropsType> = (props) => {
    return <div>{props.message}</div>
}

export default Post;