import React from 'react';
import { Form } from 'react-bootstrap';
import { WrappedFieldProps } from 'redux-form';

type PropsType = {
    placeholder: string,
    type: string
    label: string
}

export const Input: React.FC<PropsType & WrappedFieldProps> = ({ input, meta, placeholder, type, label }) => {
    return (
        <Form.Group controlId={input.name}>
            {label && <Form.Label><strong>{label}</strong></Form.Label>}
            <Form.Control placeholder={placeholder}
                //@ts-ignore
                className={!meta.valid && meta.touched && 'is-invalid'}
                as="input" {...input}
                type={type}
            />
            {meta.error && <Form.Control.Feedback type="invalid"> {meta.error} </Form.Control.Feedback>}
        </Form.Group>
    )
}