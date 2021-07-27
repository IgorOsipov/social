import React from 'react';
import { Form } from 'react-bootstrap';

export const Select = ({options, label, meta, input}) => {
    return (
        <Form.Group>
            <Form.Label htmlFor={input.name}><strong>{label}</strong></Form.Label>
            <Form.Control as="select" className={!meta.valid && meta.touched && 'is-invalid'} {...input} id={input.name}>
                {options.map(o => <option key={'opt' + o.value} value={o.value}>{o.option}</option>)}
            </Form.Control>
            <Form.Control.Feedback type="invalid"> {meta.error} </Form.Control.Feedback>
        </Form.Group>
    )
}