import React from 'react';
import { Col, Row } from 'react-bootstrap';
import Post from './Post/Post';
import PostForm from './Form/PostForm';
import { initialStateType as ProfileStateType } from '../../../Redux/profileReducer';

type MapStateToPropsType = {
    state: ProfileStateType
}

type MapDispacthToPropsType = {
    addPost: (newPostText: string) => void
}

export type PostFormValuesType = {
    newPostText: string
}

const MyPosts: React.FC<MapStateToPropsType & MapDispacthToPropsType> = (props) => {
    const onAddPost = (values: PostFormValuesType) => {
        props.addPost(values.newPostText);
    } 

    return (
        <Row>
            <Col xs={{span: 10, offset: 1 }}>
                <PostForm onSubmit={onAddPost}/>                
            </Col>
            <Col xs={{span: 10, offset: 1 }}>
                {props.state.posts.map(post => <Post key={post.id} message={post.message}/>)}
            </Col>
        </Row>
    )
}

export default MyPosts;