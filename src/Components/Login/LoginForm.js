import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { reduxForm, Field } from 'redux-form';
import styled from 'styled-components';

const LoginFormStyles = styled.div`
    padding: 0 50px;
    padding-top: calc(50vh - 300px);

    @media screen and (min-width: 992px){
        padding-left: 15%;
        padding-right: 15%;
    }

    form{
        @media screen and (min-width: 992px){
        border: 1px solid grey;
        border-radius: 5px;
        padding: 5%;
        background-color: #f7f7f7;
        }
    }
    
`

const LoginForm = (props) => {
    return (
        <LoginFormStyles>
            <Form onSubmit={props.handleSubmit}>
                <Form.Group controlId="email">
                    <Form.Label>Email address</Form.Label>
                    <Field component="input" className="form-control" name="email" type="email" placeholder="Enter email" />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>
                <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Field component="input" className="form-control" id="password" name="password" type="password" placeholder="Password" />
                </Form.Group>
                <Form.Group controlId="checkbox">
                    <Field component="input" type="checkbox" id="checkbox" name="checkbox" />
                    <Form.Label className='ml-1'>Remember me</Form.Label>
                </Form.Group>
                <Button variant="primary" type="submit">Login</Button>
            </Form>
        </LoginFormStyles>
    )
}

export default reduxForm({form: 'login'})(LoginForm);