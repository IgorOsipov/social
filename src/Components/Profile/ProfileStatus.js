import React, { useState } from 'react'
import { Button, InputGroup, FormControl } from 'react-bootstrap'
import styled from 'styled-components'

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

    const activateEditMode = () => {
        setEditMode(true);
    }

    const deactivateEditMode = () => {
        setEditMode(false);
        props.updateStatus(props.status);
    }

    return (
        <StatusStyles>
            {
                editMode !== true
                ?   <div className="status-label" onClick={activateEditMode}>{props.status || 'click to change status'}</div> 
                :   <div>
                        <InputGroup className="mb-3">
                            <FormControl
                                value={props.status}
                                autoFocus={true}
                                onChange={(e) => {
                                    props.setStatus(e.target.value)
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