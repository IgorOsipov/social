import React from 'react';
import { connect } from 'react-redux';
import Profile from './Profile';
import { getProfile } from '../../Redux/profileReducer';
import { withRouter, Redirect } from 'react-router-dom';



class ProfileContainer extends React.Component {

    componentDidMount(){
        this.props.getProfile(this.props.match.params.id)
    }

    render(){
        if(!this.props.isAuth) return <Redirect to='/login' />
        return (
            <Profile {...this.props} profile={this.props.profile}/>
        )
    }
}

const mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    isAuth: state.auth.isAuth
})


export default connect(mapStateToProps,{getProfile})(withRouter(ProfileContainer));