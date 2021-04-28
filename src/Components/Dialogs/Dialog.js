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

const Dialog = () => {
    return (
        <Row>
            <Col xs={3}>
                <DialogsContainer>
                    <DialogsList>
                        <li><NavLink to='/dialogs/1'>Kolya</NavLink></li>
                        <li><NavLink to='/dialogs/2'>Vasya</NavLink></li>
                        <li><NavLink to='/dialogs/3'>Petya</NavLink></li>
                    </DialogsList>
                </DialogsContainer>
            </Col>
            <Col xs={9}>
                <MessagesList>
                    <li>Hi, man</li>
                    <li>Hello World</li>
                    <li>Bye</li>
                </MessagesList>
            </Col>
        </Row>
    )
}

export default Dialog;