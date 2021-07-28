import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { login } from '../../Redux/authReducer';
import LoginForm from './LoginForm';




const Login = ({isAuth, id, login, captchaUrl}) => {
    const onSubmit = (data) => {
        login(data.email, data.password, data.rememberMe, data.captcha);
    }
    
    if(isAuth) return <Redirect to={`/profile/${id}`} />

    return (
        <LoginForm onSubmit={onSubmit} captchaUrl={captchaUrl}/>
    )
}

const mapStateToProps = (state) => ({
    captchaUrl: state.auth.captchaUrl,
    isAuth: state.auth.isAuth,
    id: state.auth.userId
})

export default connect(mapStateToProps, {login})(Login);