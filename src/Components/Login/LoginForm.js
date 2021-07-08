import React from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { reduxForm, Field } from 'redux-form';
import styled from 'styled-components';
import { Checkbox } from '../App/FormFields/Checkbox';
import { Input } from '../App/FormFields/Input';
import { requiredField } from '../App/Helpers/Validators';

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

const LoginForm = ({error, handleSubmit}) => {
    return (
        <LoginFormStyles>
            <Form onSubmit={handleSubmit}>
                {error && <Alert variant="danger">{error}</Alert>}
                <Field component={Input} validate={[requiredField]} name='email' label="Email address" placeholder="Enter email" type="email"/>
                <Field component={Input} validate={[requiredField]} name="password" label="Password" placeholder="Enter password" type="password" />
                <Field component={Checkbox} name="rememberMe"/>
                <Button variant="primary" type="submit">Login</Button>
            </Form>
        </LoginFormStyles>
    )
}

export default reduxForm({form: 'login'})(LoginForm);