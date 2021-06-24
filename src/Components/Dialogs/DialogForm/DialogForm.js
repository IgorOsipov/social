import React from 'react'
import { Form, Button } from 'react-bootstrap'
import { reduxForm, Field } from 'redux-form'
import { TextArea } from '../../App/FormFields/TextArea'
import { maxLength, requiredField } from '../../App/Helpers/Validators'

const maxLengthPost = maxLength(100);

const DialogForm = (props) => {
    return (
        <Form onSubmit={props.handleSubmit}>
            <Field validate={[requiredField, maxLengthPost]} component={TextArea}  name="newPost"/>
            <Button
                variant="primary" type="submit">
                Send
            </Button>
            <Button className="ml-2" variant="outline-primary" type="reset">
                Clear
            </Button>
        </Form>
    )
}

export default reduxForm({form: 'dialog'})(DialogForm)