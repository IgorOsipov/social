import React from 'react';
import { Col, Row } from 'react-bootstrap';
import Post from './Post/Post';
import PostForm from './Form/PostForm';



const MyPosts = (props) => {
    const onAddPost = (values) => {
        props.addPost(values.newPostText);
    } 

    return (
        <Row>
            <Col xs={{span: 10, offset: 1 }}>
                <PostForm state={props.state} onSubmit={onAddPost}/>                
            </Col>
            <Col xs={{span: 10, offset: 1 }}>
                {props.state.posts.map(post => <Post key={post.id} message={post.message}/>)}
            </Col>
        </Row>
    )
}

export default MyPosts;