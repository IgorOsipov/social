import React, { useState, useEffect } from 'react';
import { Button, InputGroup, FormControl } from 'react-bootstrap';
import styled from 'styled-components';

const StatusStyles = styled.div`
    .user-status-label{
        cursor: pointer;
        &:hover{
            text-decoration: underline;
        }
    }
    .user-status-label,
    .status-label{
        padding: 6px 0;
    }
`

type PropsType = {
    status: string
    updateStatus: (status: string) => void
    isAuth: boolean
    isOwner: boolean
    userId: number | null
}

const ProfileStatus: React.FC<PropsType> = (props) => {

    const [editMode, setEditMode] = useState(false);
    const [status, setStatus] = useState(props.status);

    useEffect(()=>{
        setStatus(props.status);
    }, [props.status]);

    const activateEditMode = () => {
        setEditMode(true);
    }

    const deactivateEditMode = () => {
        setEditMode(false);
        props.updateStatus(status);
    }


    return (
        <StatusStyles>
            {
                (props.isAuth && props.isOwner)
                ?   (editMode !== true
                    ?   <div className="user-status-label" onClick={activateEditMode}>{status || 'click to change status'}</div> 
                    :   <div>
                            <InputGroup className="mb-3">
                                <FormControl
                                    value={status}
                                    autoFocus={true}
                                    onChange={(e) => {
                                        setStatus(e.target.value)
                                    }}
                                />
                                <InputGroup.Append>
                                    <Button onClick={ deactivateEditMode }>Save</Button>
                                </InputGroup.Append>
                            </InputGroup>
                        </div>
                    ) 
                : (status && <div className="status-label" >{status}</div>)
            }
        </StatusStyles>
    )

}

export default ProfileStatus