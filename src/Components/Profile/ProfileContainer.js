import React from 'react';
import { connect } from 'react-redux';
import Profile from './Profile';
import { getProfile } from '../../Redux/profileReducer';
import { withRouter } from 'react-router-dom';
import { withAuthRedirect } from '../HOC/WithAuthRedirect';
import { compose } from 'redux';



class ProfileContainer extends React.Component {

    componentDidMount(){
        this.props.getProfile(this.props.match.params.id)
    }

    render(){
        
        return (
            <Profile {...this.props} profile={this.props.profile}/>
        )
    }
}

const mapStateToProps = (state) => ({
    profile: state.profilePage.profile
})

export default compose(
    connect(mapStateToProps,{getProfile}),
    withRouter,
    withAuthRedirect
)(ProfileContainer)
