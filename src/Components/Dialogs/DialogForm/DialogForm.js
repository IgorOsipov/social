import React from 'react'
import { Form, Button } from 'react-bootstrap'
import { reduxForm, Field } from 'redux-form'

const DialogForm = (props) => {
    return (
        <Form onSubmit={props.handleSubmit}>
            <Form.Group controlId="newText">
                <Form.Label>New Post</Form.Label>
                <Field component="textarea" className="form-control" id="newText" name="newPost"
                         style={{ resize: "none" }} rows={3}
                />
            </Form.Group>
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