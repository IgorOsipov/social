import React from 'react';
import { connect } from 'react-redux';
import Profile from './Profile';
import { getProfile, getStatus, updateStatus, savePhoto } from '../../Redux/profileReducer';
import { withRouter } from 'react-router-dom';
import { withAuthRedirect } from '../HOC/WithAuthRedirect';
import { compose } from 'redux';



class ProfileContainer extends React.Component {

    refreshProfile(){
        let userId = this.props.match.params.id;
        if(!userId){
            userId = this.props.userId;
            if(!userId){
                this.props.history.push('/login');
                return null;
            }
        }
        this.props.getProfile(userId);
        this.props.getStatus(userId);
    }

    componentDidMount(){
        this.refreshProfile();
    }

    componentDidUpdate(prevProps){
        if(this.props.match.params.id !== prevProps.match.params.id){
            this.refreshProfile();
        }
    }

    updateStatus = (status) => {
        this.props.updateStatus(status)
    }

    setStatus = (status) => {
        this.props.setStatus(status)
    }

    render(){
        
        return (
            <Profile {...this.props} isOwner={parseInt(this.props.match.params.id) === this.props.userId} />
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
    connect(mapStateToProps,{getProfile, getStatus, updateStatus, savePhoto}),
    withRouter,
    withAuthRedirect
)(ProfileContainer)
