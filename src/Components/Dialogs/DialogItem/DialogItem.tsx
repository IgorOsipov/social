import React from 'react';
import { NavLink } from 'react-router-dom';

type PropsType = {
    id: number
    name: string | null
}

const DialogItem: React.FC<PropsType> = (props) => {
    return (
        <NavLink  style={{color: 'inherit'}} to={'/dialogs/' + props.id}>{props.name}</NavLink>
    )
}

export default DialogItem;