import React from 'react';
import Users from './Users';
import { connect } from 'react-redux';
import { followUser, unfollowUser, requestUsers } from '../../Redux/usersReducer';
import PreloaderImage from '../App/Preloader/Preloader';
import { compose } from 'redux';
import { withAuthRedirect } from '../HOC/WithAuthRedirect';
import { getCurrentPage, getFollowingInProgress, getIsFetching, getPageSize, getTotalUsersCount, getUsersSelector } from '../../Redux/usersSelectors';
import { usersType } from '../../Types/types';
import { AppStateType } from '../../Redux/store';

type Props = {
    currentPage: number
    pageSize: number
    isFetching: boolean
    totalUsersCount: number
    followingInProgress: Array<number>
    users: Array<usersType>
    isAuth: boolean
    userId: number
    requestUsers: (currentPage: number, pageSize: number) => void
    followUser: (userId: number) => void
    unfollowUser: (userId: number) => void
}

class UsersContainer extends React.Component<Props> {

    componentDidMount() {
        this.props.requestUsers(this.props.currentPage, this.props.pageSize);
    }

    onPageChanged = (p: {selected: number}) => {
        this.props.requestUsers(p.selected + 1, this.props.pageSize)
    }

    onFollowClick = (userId: number) => {
        this.props.followUser(userId)
    }

    onUnfollowClick = (userId: number) => {
        this.props.unfollowUser(userId)
    }


    render() {
        return <>
            {this.props.isFetching ? <PreloaderImage /> : null}
            <Users 
                onPageChanged={this.onPageChanged}
                onFollowClick={this.onFollowClick}
                onUnfollowClick={this.onUnfollowClick}
                pageSize={this.props.pageSize}
                totalUsersCount={this.props.totalUsersCount}
                users={this.props.users}
                followingInProgress={this.props.followingInProgress}
                isAuth={this.props.isAuth}
                userId={this.props.userId}
            />
        </>
    }
}

const mapStateToProps = (state: AppStateType) => {
    return {
        users: getUsersSelector(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),
        isAuth: state.auth.isAuth,
        userId: state.auth.userId
    }
}

export default compose(
    connect(mapStateToProps, { followUser, unfollowUser, requestUsers }),
    withAuthRedirect
)(UsersContainer)
