import React from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import Post from './Post/Post';
import { addPostActionCreator, updateNewPostTextActionCreator } from '../../../Redux/profileReducer';



const MyPosts = (props) => {
    
    return (
        <Row>
            <Col xs={{span: 10, offset: 1 }}>
                <Form>
                    <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Label>New Post</Form.Label>
                        <Form.Control as="textarea"
                            onChange={(e)=>{props.dispatch(updateNewPostTextActionCreator(e.nativeEvent.data))}}
                            value={props.state.newPostText} style={{resize: "none"}} rows={3} 
                        />
                    </Form.Group>
                    <Button onClick={ () => {props.dispatch(addPostActionCreator())} }  
                        variant="primary" type="button">
                        Add Post
                    </Button>
                    <Button className="ml-2" variant="outline-primary" type="reset">
                        Clear
                    </Button>
                </Form>
                
            </Col>
            <Col xs={{span: 10, offset: 1 }}>
                {props.state.posts.map(post => <Post key={post.id} message={post.message}/>)}
            </Col>
        </Row>
    )
}

export default MyPosts;