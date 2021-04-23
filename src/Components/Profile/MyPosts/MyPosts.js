import React from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import Post from './Post/Post';

const MyPosts = () => {
    return (
        <Row>
            <Col xs={{span: 10, offset: 1 }}>
                <Form>
                    <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Example textarea</Form.Label>
                        <Form.Control as="textarea" style={{resize: "none"}} rows={3} />
                    </Form.Group>
                    <Button variant="primary" type="button">
                        Add Post
                    </Button>
                    <Button className="ml-2" variant="outline-primary" type="reset">
                        Clear
                    </Button>
                </Form>
                
            </Col>
            <Col xs={{span: 10, offset: 1 }}>
                <Post />
            </Col>
        </Row>
    )
}

export default MyPosts;