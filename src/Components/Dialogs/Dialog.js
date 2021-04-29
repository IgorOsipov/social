import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const DialogsList = styled.ul`
    list-style: none;
`
const MessagesList = styled.ul`
    list-style: none;
`
const DialogsContainer = styled.div`
    border-right: 1px solid gray;
    min-height: 100vh;
`

const DialogItem = (props) => {
    return(
        <li><NavLink to={'/dialogs/' + props.id}>{props.name}</NavLink></li>
    )
}

const Message = (props) => {
    return(
        <li>{props.message}</li>
    )
}

const Dialog = () => {
    return (
        <Row>
            <Col xs={3}>
                <DialogsContainer>
                    <DialogsList>
                        <DialogItem name={'Kolya'} id='1'/>
                        <DialogItem name={'Vasya'} id='2'/>
                        <DialogItem name={'Petya'} id='3'/>
                    </DialogsList>
                </DialogsContainer>
            </Col>
            <Col xs={9}>
                <MessagesList>
                    <Message message = 'Hi, man'/>
                    <Message message = 'Hello World'/>
                    <Message message = 'Bye'/>
                </MessagesList>
            </Col>
        </Row>
    )
}

export default Dialog;