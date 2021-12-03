import React from 'react';
import { connect } from 'react-redux';
import Profile from './Profile';
import { getProfile, getStatus, updateStatus, savePhoto, saveProfile } from '../../Redux/profileReducer';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { withAuthRedirect } from '../HOC/WithAuthRedirect';
import { compose } from 'redux';
import { AppStateType } from '../../Redux/store';
import { profileType } from '../../Types/types';


type MapPropsType = ReturnType<typeof mapStateToProps>;
type DispatchPropsType = {
    getProfile: (id: number) => void
    getStatus: (id: number) => void
    updateStatus: (status: string) => void
    savePhoto: (file: File) => void
    saveProfile: (profile: profileType) => Promise<any>
}
type PathParamsType = {
    id: string
}
type PropsType = MapPropsType & DispatchPropsType & RouteComponentProps<PathParamsType>

class ProfileContainer extends React.Component<PropsType> {

    refreshProfile(){
        let userId: number | null = +this.props.match.params.id;
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

    componentDidUpdate(prevProps: PropsType){
        if(this.props.match.params.id !== prevProps.match.params.id){
            this.refreshProfile();
        }
    }

    updateStatus = (status: string) => {
        this.props.updateStatus(status)
    }

    // setStatus = (status: string) => {
    //     this.props.setStatus(status)
    // }

    render(){
        
        return (
            <Profile {...this.props} isOwner={parseInt(this.props.match.params.id) === this.props.userId} />
        )
    }
}

const mapStateToProps = (state: AppStateType) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    preloader: state.profilePage.preload,
    userId: state.auth.userId,
    isAuth: state.auth.isAuth
})

export default compose(
    connect(mapStateToProps,{getProfile, getStatus, updateStatus, savePhoto, saveProfile}),
    withRouter,
    withAuthRedirect
)(ProfileContainer) as React.ComponentType
