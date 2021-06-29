import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { login } from '../../Redux/authReducer';
import LoginForm from './LoginForm';




const Login = (props) => {
    const onSubmit = (data) => {
        props.login(data.email, data.password, data.rememberMe);
    }
    
    if(props.isAuth) return <Redirect to={`/profile/${props.id}`} />

    return (
        <LoginForm onSubmit={onSubmit}/>
    )
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    id: state.auth.userId
})

export default connect(mapStateToProps, {login})(Login);