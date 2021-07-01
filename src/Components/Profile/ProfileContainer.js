import React from 'react';
import { connect } from 'react-redux';
import Profile from './Profile';
import { getProfile, getStatus, updateStatus, setStatus } from '../../Redux/profileReducer';
import { withRouter } from 'react-router-dom';
import { withAuthRedirect } from '../HOC/WithAuthRedirect';
import { compose } from 'redux';



class ProfileContainer extends React.Component {

    componentDidMount(){
        let userId = this.props.match.params.id;
        if(!userId){
            userId = this.props.userId;
            if(!userId){
                this.props.history.push('/login')
                return null
            }
        }
        this.props.getProfile(userId)
        this.props.getStatus(userId)
    }

    updateStatus = (status) => {
        this.props.updateStatus(status)
    }

    setStatus = (status) => {
        this.props.setStatus(status)
    }

    render(){
        
        return (
            <Profile {...this.props} />
        )
    }
}

const mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    preloader: state.profilePage.preload,
    userId: state.auth.userId,
    isAuth: state.auth.isAuth
})

export default compose(
    connect(mapStateToProps,{getProfile, getStatus, updateStatus, setStatus}),
    withRouter,
    withAuthRedirect
)(ProfileContainer)
