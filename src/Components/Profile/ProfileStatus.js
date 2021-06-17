import React from 'react'
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

class ProfileStatus extends React.Component {

    state = {
        editMode: false,
    }

    activateEditMode = () => {
        this.setState({
            editMode: true
        })
    }

    deactivateEditMode = () => {
        this.setState({
            editMode: false
        })
        this.props.updateStatus(this.props.status)
    }

    render() {
        return (
            <StatusStyles>
                {
                    !this.state.editMode ?
                        <div className="status-label" onClick={this.activateEditMode}>{this.props.status || 'click to change status'}</div> :
                        <div>
                            <InputGroup className="mb-3">
                                <FormControl
                                    value={this.props.status}
                                    autoFocus={true}
                                    ref={this.statusRef}
                                    onChange={(e) => {
                                       this.props.setStatus(e.target.value)
                                    }}
                                />
                                <InputGroup.Append>
                                    <Button onClick={() => { this.deactivateEditMode() }}>Save</Button>
                                </InputGroup.Append>
                            </InputGroup>
                        </div>
                }
            </StatusStyles>
        )
    }
}

export default ProfileStatus