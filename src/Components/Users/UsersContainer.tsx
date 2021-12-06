import React from 'react';
import Users from './Users';
import { connect } from 'react-redux';
import { followUser, unfollowUser, requestUsers, FilterType } from '../../Redux/usersReducer';
import PreloaderImage from '../App/Preloader/Preloader';
import { compose } from 'redux';
import { withAuthRedirect } from '../HOC/WithAuthRedirect';
import { getCurrentPage, getFollowingInProgress, getIsFetching, getPageSize, getTotalUsersCount, getUsersFilter, getUsersSelector } from '../../Redux/usersSelectors';
import { usersType } from '../../Types/types';
import { AppStateType } from '../../Redux/store';

type MapStatePropsType = {
    currentPage: number
    pageSize: number
    isFetching: boolean
    totalUsersCount: number
    followingInProgress: Array<number>
    users: Array<usersType>
    isAuth: boolean
    userId: number | null
    filter: FilterType
}

type MapDispatchPropsType = {
    requestUsers: (currentPage: number, pageSize: number, filter: FilterType) => void
    followUser: (userId: number) => void
    unfollowUser: (userId: number) => void
}

type PropsType = MapStatePropsType & MapDispatchPropsType;

class UsersContainer extends React.Component<PropsType> {

    componentDidMount() {
        this.props.requestUsers(this.props.currentPage, this.props.pageSize, this.props.filter);
    }

    onPageChanged = (p: { selected: number }) => {
        this.props.requestUsers(p.selected + 1, this.props.pageSize, this.props.filter);
    }

    onFollowClick = (userId: number) => {
        this.props.followUser(userId)
    }

    onUnfollowClick = (userId: number) => {
        this.props.unfollowUser(userId)
    }

    onFilterChanged = (filter: FilterType) => {
        this.props.requestUsers(1, this.props.pageSize, filter);
    }


    render() {
        return <>
            {this.props.isFetching ? <PreloaderImage /> : null}
            <Users
                onPageChanged={this.onPageChanged}
                onFollowClick={this.onFollowClick}
                onUnfollowClick={this.onUnfollowClick}
                onFilterChanged={this.onFilterChanged}
                pageSize={this.props.pageSize}
                totalUsersCount={this.props.totalUsersCount}
                users={this.props.users}
                followingInProgress={this.props.followingInProgress}
                isAuth={this.props.isAuth}
                userId={this.props.userId}
                currentPage={this.props.currentPage}
            />
        </>
    }
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        users: getUsersSelector(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),
        filter: getUsersFilter(state),
        isAuth: state.auth.isAuth,
        userId: state.auth.userId        
    }
}

export default compose(
    //<TStateProps = {}, TDispatchProps = {}, TOwnProps = {}, State = DefaultState>
    connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(mapStateToProps, { followUser, unfollowUser, requestUsers }),
    withAuthRedirect
)(UsersContainer) as React.ComponentType
