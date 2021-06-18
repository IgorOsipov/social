import React from 'react';
import LoginForm from './LoginForm';




const Login = (props) => {
    const onSubmit = (data) => {
        console.log(data)
    }

    return (
        <LoginForm onSubmit={onSubmit}/>
    )
}

export default Login;