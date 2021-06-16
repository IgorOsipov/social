import React from 'react';
import { connect } from 'react-redux';
import Header from './Header';
import { setAuthUser } from '../../Redux/authReducer';


class HeaderContainer extends React.Component {
    componentDidMount() {
        this.props.setAuthUser()
    }

    render() {
        return <Header {...this.props} />
    }
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login
})

export default connect(mapStateToProps, { setAuthUser })(HeaderContainer)