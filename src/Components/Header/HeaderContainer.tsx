import React from 'react';
import { connect } from 'react-redux';
import Header from './Header';
import { logout } from '../../Redux/authReducer';
import { AppStateType } from '../../Redux/store';

type StatePropsType = {
    isAuth: boolean
    userId: number | null
    login: string | null
}

type MapPropsType = {
    logout: () => void
}

export type PropsType = StatePropsType & MapPropsType

class HeaderContainer extends React.Component<PropsType> {
    render() {
        return <Header {...this.props} />
    }
}

const mapStateToProps = (state: AppStateType):StatePropsType  => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login,
    userId: state.auth.userId
})

export default connect<StatePropsType, MapPropsType, {}, AppStateType>(mapStateToProps, { logout })(HeaderContainer)