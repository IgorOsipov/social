import React from 'react';
import { Form } from 'react-bootstrap';

export const Checkbox:React.FC<{input: any}> = ({ input }) => {
    return (
        <Form.Group>
            <Form.Check {...input} id={input.name} name={input.name} label="Remember me"/>
        </Form.Group>
    )
}