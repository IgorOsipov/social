import React from 'react';
import Users from './Users';
import { connect } from 'react-redux';
import { followUser, setCurrentPage,  unfollowUser, getUsers } from '../../Redux/usersReducer';
import PreloaderImage from '../App/Preloader/Preloader';



class UsersContainer extends React.Component {

    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize);
    }

    onPageChanged = (p) => {
        this.props.setCurrentPage(p)
        this.props.getUsers(p, this.props.pageSize)
    }

    onFollowClick = (userId) => {
        this.props.followUser(userId)
    }

    onUnfollowClick = (userId) => {
        this.props.unfollowUser(userId)
    }


    render() {
        return <>
            {this.props.isFetching ? <PreloaderImage /> : null}
            <Users
                onPageChanged={this.onPageChanged}
                onFollowClick={this.onFollowClick}
                onUnfollowClick={this.onUnfollowClick}
                currentPage={this.props.currentPage}
                pageSize={this.props.pageSize}
                totalUsersCount={this.props.totalUsersCount}
                users={this.props.users}
                followingInProgress={this.props.followingInProgress}
            />
        </>
    }
}


const mapStateToProps = (state) => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        followingInProgress: state.usersPage.followingInProgress
    }
}


export default connect(mapStateToProps, { followUser, unfollowUser, setCurrentPage, getUsers })(UsersContainer);