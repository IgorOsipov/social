import React from 'react';
import Users from './Users';
import { connect } from 'react-redux';
import { follow, setCurrentPage, setUsers, unfollow, setTotalCount, toggleIsFetching, toggleFollowingInProgress } from '../../Redux/usersReducer';
import PreloaderImage from '../App/Preloader/Preloader';
import { getUsers } from '../../API/api';



class UsersContainer extends React.Component {

    componentDidMount() {
        getUsers(this.props.currentPage, this.props.pageSize).then(u => {
            this.props.setUsers(u.items)
            this.props.setTotalCount(u.totalCount)
            this.props.toggleIsFetching(false)
        })
    }

    onPageChanged = (p) => {
        this.props.setCurrentPage(p)
        getUsers(p, this.props.pageSize)
            .then(u => {
                this.props.setUsers(u.items)
                this.props.setTotalCount(u.totalCount)
                this.props.toggleIsFetching(false)
            })
    }


    render() {
        return <>
            {this.props.isFetching ? <PreloaderImage /> : null}
            <Users
                setCurrentPage={this.props.setCurrentPage}
                onPageChanged={this.onPageChanged}
                getUsers={this.getUsers}
                currentPage={this.props.currentPage}
                pageSize={this.props.pageSize}
                totalUsersCount={this.props.totalUsersCount}
                users={this.props.users}
                follow={this.props.follow}
                unfollow={this.props.unfollow}
                toggleFollowingInProgress={this.props.toggleFollowingInProgress}
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


export default connect(mapStateToProps, 
    { follow, unfollow, setUsers, setCurrentPage, setTotalCount, toggleIsFetching, toggleFollowingInProgress })(UsersContainer);