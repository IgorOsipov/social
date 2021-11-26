import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { login } from '../../Redux/authReducer';
import { AppStateType } from '../../Redux/store';
import LoginForm from './LoginForm';


type MapStateToPropsType = {
    captchaUrl: string | null
    isAuth: boolean
    id: number | null
}

type MapDispacthToPropsType = {
    login: (email: string, password: string, rememberMe: boolean, captcha: string | null) => void
}

export type LoginFormValuesType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string
}

const Login: React.FC<MapStateToPropsType & MapDispacthToPropsType> = ({isAuth, id, login, captchaUrl}) => {
    const onSubmit = (data: LoginFormValuesType) => {
        login(data.email, data.password, data.rememberMe, data.captcha);
    }
    
    if(isAuth) return <Redirect to={`/profile/${id}`} />

    return (
        <LoginForm onSubmit={onSubmit} captchaUrl={captchaUrl}/>
    )
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
    captchaUrl: state.auth.captchaUrl,
    isAuth: state.auth.isAuth,
    id: state.auth.userId
});

export default connect(mapStateToProps, {login})(Login);