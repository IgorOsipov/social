import React from 'react';
import { Form } from 'react-bootstrap';

export const TextArea = ({input, meta}) => {
    return (
        <Form.Group controlId={input.name}>
            <Form.Label>New Post</Form.Label>
            <Form.Control as="textarea" className={!meta.valid && meta.touched && 'is-invalid'} {...input} style={{ resize: "none" }} rows={3} />
            <Form.Control.Feedback type="invalid"> {meta.error} </Form.Control.Feedback>
        </Form.Group>
    )
}