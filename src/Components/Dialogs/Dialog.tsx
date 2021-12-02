import React from 'react';
import { Col, ListGroup, Row } from 'react-bootstrap';
import styled from 'styled-components';
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';
import DialogForm from './DialogForm/DialogForm';
import { initialStateType } from '../../Redux/dialogsReducer';

const MessagesList = styled.ul`
    list-style: none;
`
const DialogsContainer = styled.div`
    border-right: 1px solid gray;
    min-height: 100vh;
`

type DialogPropsType = {
    dialogsPage: initialStateType
    sendMessage: (messageText: string) => void
}

export type DialogFormValuesType = {
    newPost: string
}

const Dialog: React.FC<DialogPropsType> = (props) => {

    const onSubmitPost = (values: DialogFormValuesType) => {
        props.sendMessage(values.newPost);
    }

    return (
        <Row>
            <Col xs={3}>
                <DialogsContainer>
                    <ListGroup as="ul">
                        {props.dialogsPage.dialogsData.map((item)=><ListGroup.Item as="li" key={item.id}><DialogItem name={item.name} id={item.id}/></ListGroup.Item>)}
                    </ListGroup>
                </DialogsContainer>
            </Col>
            <Col xs={9} style={{paddingRight: '45px'}}>
                <MessagesList>
                    {props.dialogsPage.messagesData.map((item)=><Message message={item.message} key={item.id}/>)}
                </MessagesList>
                <DialogForm onSubmit={onSubmitPost} />
            </Col>
        </Row>
    )
}

export default Dialog;