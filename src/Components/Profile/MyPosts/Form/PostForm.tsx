import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { reduxForm, Field, InjectedFormProps } from 'redux-form';
import { TextArea } from '../../../App/FormFields/TextArea';
import { maxLength, requiredField } from '../../../App/Helpers/Validators';
import { PostFormValuesType } from '../MyPosts';

const maxLenght30 = maxLength(30);

type PostFormOwnPropsType = {

}


const PostForm: React.FC<InjectedFormProps<PostFormValuesType, PostFormOwnPropsType> & PostFormOwnPropsType> = (props) => {
    return (
        <Form onSubmit={props.handleSubmit}>
            <Field validate={[requiredField, maxLenght30]} className="form-control" name='newPostText' label='New Post' component={TextArea} />
            <Button variant="primary" type="submit">
                Add Post
            </Button>
            <Button className="ml-2" variant="outline-primary" type="reset">
                Clear
            </Button>
        </Form>
    )
    
}

export default reduxForm<PostFormValuesType, PostFormOwnPropsType>({form: 'posts'})(PostForm);