import React from 'react';
import { connect } from 'react-redux';
import Profile from './Profile';
import { setUserProfile } from '../../Redux/profileReducer';
import { withRouter } from 'react-router-dom';


class ProfileContainer extends React.Component {

    componentDidMount(){
        fetch(`https://social-network.samuraijs.com/api/1.0/profile/${this.props.match.params.id}`)
            .then(response => response.json())
            .then(p => {
                this.props.setUserProfile(p)
            })
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


export default connect(mapStateToProps,{setUserProfile})(withRouter(ProfileContainer));