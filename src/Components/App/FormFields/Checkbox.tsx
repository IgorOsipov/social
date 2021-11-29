import React from 'react';
import { Form } from 'react-bootstrap';
import { WrappedFieldInputProps } from 'redux-form';

export const Checkbox:React.FC<{input: WrappedFieldInputProps}> = ({ input }) => {
    return (
        <Form.Group>
            <Form.Check {...input} id={input.name} name={input.name} label="Remember me"/>
        </Form.Group>
    )
}