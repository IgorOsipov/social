import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { reduxForm, Field } from 'redux-form';

const PostForm = (props) => {
    return (
        <Form onSubmit={props.handleSubmit}>
            <Form.Group controlId="newPostField">
                <Form.Label>New Post</Form.Label>
                <Field className="form-control" id='newPostField' name='newPostText' component="textarea"  style={{ resize: "none" }} rows={3}/>
            </Form.Group>
            <Button onClick={props.addPost}
                variant="primary" type="submit">
                Add Post
            </Button>
            <Button className="ml-2" variant="outline-primary" type="reset">
                Clear
            </Button>
        </Form>
    )
    
}

export default reduxForm({form: 'posts'})(PostForm);