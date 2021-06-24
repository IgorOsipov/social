import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { reduxForm, Field } from 'redux-form';
import { TextArea } from '../../../App/FormFields/TextArea';
import { maxLength, requiredField } from '../../../App/Helpers/Validators';

const maxLenght30 = maxLength(30);

const PostForm = (props) => {
    return (
        <Form onSubmit={props.handleSubmit}>
            <Field validate={[requiredField, maxLenght30]} className="form-control" name='newPostText' component={TextArea} />
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