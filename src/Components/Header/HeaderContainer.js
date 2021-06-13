import React from 'react';
import { connect } from 'react-redux';
import Header from './Header';
import { setAuthUserData } from '../../Redux/authReducer';


class HeaderContainer extends React.Component {
    componentDidMount() {
        fetch(`https://social-network.samuraijs.com/api/1.0/auth/me`, { credentials: 'include' })
            .then(response => response.json())
            .then(r => {
                console.log(r)
                if(r.resultCode === 0){
                    this.props.setAuthUserData(r.data.id, r.data.email, r.data.login)
                }
            })
    }

    render() {
        return <Header {...this.props} />
    }
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login
})

export default connect(mapStateToProps, { setAuthUserData })(HeaderContainer)