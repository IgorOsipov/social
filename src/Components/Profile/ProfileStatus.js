import React, { useState, useEffect } from 'react';
import { Button, InputGroup, FormControl } from 'react-bootstrap';
import styled from 'styled-components';

const StatusStyles = styled.div`
    .status-label{
        padding: 6px 12px;
        cursor: pointer;
        &:hover{
            text-decoration: underline;
        }
    }
`

const ProfileStatus = (props) => {

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
                editMode !== true
                ?   <div className="status-label" onClick={activateEditMode}>{status || 'click to change status'}</div> 
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
            }
        </StatusStyles>
    )

}

export default ProfileStatus