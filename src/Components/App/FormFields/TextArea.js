import React from 'react';
import { Form } from 'react-bootstrap';

export const TextArea = ({input, meta, name, label}) => {
    return (
        <Form.Group controlId={input.name}>
            <Form.Label><strong>{label}</strong></Form.Label>
            <Form.Control as="textarea" id={name} className={!meta.valid && meta.touched && 'is-invalid'} {...input} style={{ resize: "none" }} rows={3} />
            <Form.Control.Feedback type="invalid"> {meta.error} </Form.Control.Feedback>
        </Form.Group>
    )
}