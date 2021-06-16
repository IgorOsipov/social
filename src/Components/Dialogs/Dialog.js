import React from 'react';
import { Col, Form, ListGroup, Row, Button } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';

const MessagesList = styled.ul`
    list-style: none;
`
const DialogsContainer = styled.div`
    border-right: 1px solid gray;
    min-height: 100vh;
`

const Dialog = (props) => {
    if(!props.isAuth) return <Redirect to={'/login'} />


    return (
        <Row>
            <Col xs={3}>
                <DialogsContainer>
                    <ListGroup as="ul">
                        {props.state.dialogsData.map((item)=><ListGroup.Item as="li" key={item.id}><DialogItem name={item.name} id={item.id}/></ListGroup.Item>)}
                    </ListGroup>
                </DialogsContainer>
            </Col>
            <Col xs={9}>
                <MessagesList>
                    {props.state.messagesData.map((item)=><Message message={item.message} key={item.id}/>)}
                </MessagesList>
                <Form>
                    <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Label>New Post</Form.Label>
                        <Form.Control as="textarea"
                            onChange = { e => props.onMessageChange(e.nativeEvent.data) }
                            value={props.state.newMessageText} style={{resize: "none"}} rows={3} 
                        />
                    </Form.Group>
                    <Button   
                        onClick={()=>{props.onButtonClick()}}
                        variant="primary" type="button">
                        Send
                    </Button>
                    <Button className="ml-2" variant="outline-primary" type="reset">
                        Clear
                    </Button>
                </Form>
            </Col>
        </Row>
    )
}

export default Dialog;