import React from 'react';
import Users from './Users';
import { connect } from 'react-redux';
import { followAC, setCurrentPageAC, setUsersAC, unfollowAC, setTotalCountAC } from '../../Redux/usersReducer';



class UsersContainer extends React.Component {

    getUsers = (cPage, pSize) => {
        fetch(`https://social-network.samuraijs.com/api/1.0/users?page=${cPage}&count=${pSize}`)
            .then(response => response.json())
            .then(u => {
                this.props.setUsers(u.items)
                this.props.SetTotalCount(u.totalCount)
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
        return <Users 
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
    }
}


const mapStateToProps = (state) => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
        follow: (userID) => {
            dispatch(followAC(userID))
        },
        unfollow: (userID) => {
            dispatch(unfollowAC(userID))
        },
        setUsers: (users)=>{
            dispatch(setUsersAC(users))
        },
        setCurrentPage: (currentPage)=>{
            dispatch(setCurrentPageAC(currentPage))
        },
        SetTotalCount: (totalCount)=>{
            dispatch(setTotalCountAC(totalCount))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer);