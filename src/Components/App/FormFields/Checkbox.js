import React from 'react';
import { Form } from 'react-bootstrap';

export const Checkbox = ({ input }) => {
    return (
        <Form.Group>
            <Form.Check {...input} id={input.name} name={input.name} label="Remember me"/>
        </Form.Group>
    )
}