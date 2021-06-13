import React from 'react';
import Users from './Users';
import { connect } from 'react-redux';
import { follow, setCurrentPage, setUsers, unfollow, setTotalCount, toggleIsFetching } from '../../Redux/usersReducer';
import PreloaderImage from '../App/Preloader/Preloader';



class UsersContainer extends React.Component {

    getUsers = (cPage, pSize) => {
        this.props.toggleIsFetching(true)
        fetch(`https://social-network.samuraijs.com/api/1.0/users?page=${cPage}&count=${pSize}`, {credentials: 'include'})
            .then(response => response.json())
            .then(u => {
                this.props.setUsers(u.items)
                this.props.setTotalCount(u.totalCount)
                this.props.toggleIsFetching(false)
            })
    }
    componentDidMount() {
        this.getUsers(this.props.currentPage, this.props.pageSize)
    }
    
    onPageChanged = (p) => {
        this.props.setCurrentPage(p)
        this.getUsers(p, this.props.pageSize)
    }


    render() {
        return <>
                    {this.props.isFetching ? <PreloaderImage /> : null}
                    <Users 
                        setCurrentPage = {this.props.setCurrentPage}
                        onPageChanged = {this.onPageChanged}
                        getUsers={this.getUsers} 
                        currentPage={this.props.currentPage} 
                        pageSize={this.props.pageSize}
                        totalUsersCount = {this.props.totalUsersCount}
                        users = {this.props.users}
                        follow = {this.props.follow}
                        unfollow = {this.props.unfollow}
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
        isFetching: state.usersPage.isFetching
    }
}


export default connect(mapStateToProps, {follow,unfollow,setUsers,setCurrentPage,setTotalCount,toggleIsFetching})(UsersContainer);