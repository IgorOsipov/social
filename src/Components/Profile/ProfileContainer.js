import React from 'react';
import { connect } from 'react-redux';
import Profile from './Profile';
import { getProfile, getStatus, updateStatus, setStatus } from '../../Redux/profileReducer';
import { withRouter } from 'react-router-dom';
//import { withAuthRedirect } from '../HOC/WithAuthRedirect';
import { compose } from 'redux';



class ProfileContainer extends React.Component {

    componentDidMount(){
        let userId = this.props.match.params.id;
        if(!userId){
            userId = 1083;
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
            <Profile {...this.props} profile={this.props.profile} status={this.props.status} updateStatus={this.updateStatus} setStatus={this.setStatus}/>
        )
    }
}

const mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status
})

export default compose(
    connect(mapStateToProps,{getProfile, getStatus, updateStatus, setStatus}),
    withRouter
    //withAuthRedirect
)(ProfileContainer)
