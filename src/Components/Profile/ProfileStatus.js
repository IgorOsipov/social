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
        editMode: false
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
    }

    render() {
        return (
            <StatusStyles>
                {
                    !this.state.editMode ?
                        <div className="status-label" onClick={this.activateEditMode}>{this.props.status}</div> :
                        <div>
                            <InputGroup className="mb-3">
                                <FormControl
                                    value={this.props.status}
                                    autoFocus={true}
                                />
                                <InputGroup.Append>
                                    <Button onClick={ this.deactivateEditMode }>Save</Button>
                                </InputGroup.Append>
                            </InputGroup>
                        </div>
                }
            </StatusStyles>
        )
    }
}

export default ProfileStatus