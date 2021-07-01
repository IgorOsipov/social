import SamServices from "../API/SamAPI";

const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = 'SET_USERS'
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'
const SET_TOTAL_COUNT = 'SET_TOTAL_COUNT'
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING'
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS'

const SamAPI = new SamServices()

const initialState = {
    users: [],
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: []
}

const usersReducer = (state = initialState, action) => {

    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userID) {
                        return { ...u, followed: true }
                    }
                    return u
                })
            }
        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userID) {
                        return { ...u, followed: false }
                    }
                    return u
                })
            }
        case SET_USERS:
            return {
                ...state, users: action.users
            }
        case SET_CURRENT_PAGE:
            return {
                ...state, currentPage: action.currentPage
            }
        case SET_TOTAL_COUNT:
            return {
                ...state, totalUsersCount: action.totalCount
            }
        case TOGGLE_IS_FETCHING:
            return {
                ...state, isFetching: action.isFetching
            }
        case TOGGLE_IS_FOLLOWING_PROGRESS:
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userID]
                    : [...state.followingInProgress.filter(id => id !== action.userID)]
            }
        default:
            return state
    }

}

export const follow = (userID) => ({ type: FOLLOW, userID })
export const unfollow = (userID) => ({ type: UNFOLLOW, userID })
export const setUsers = (users) => ({ type: SET_USERS, users })
export const setCurrentPage = (currentPage) => ({ type: SET_CURRENT_PAGE, currentPage })
export const setTotalCount = (totalCount) => ({ type: SET_TOTAL_COUNT, totalCount })
export const toggleIsFetching = (isFetching) => ({ type: TOGGLE_IS_FETCHING, isFetching })
export const toggleFollowingInProgress = (isFetching, userID) => ({ type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userID })

export const getUsers = (currentPage, pageSize) => {
    return (dispatch) => {
        dispatch(toggleIsFetching(true))
        SamAPI.getUsers(currentPage, pageSize).then(u => {
            dispatch(setUsers(u.items))
            dispatch(setTotalCount(u.totalCount))
            dispatch(toggleIsFetching(false))
        })
    }
}

export const followUser = (userId) => (dispatch) => {
    dispatch(toggleFollowingInProgress(true, userId))
    SamAPI.followUser(userId)
        .then(responce => {
            if (responce.resultCode === 0) {
                dispatch(follow(userId));

                dispatch(toggleFollowingInProgress(false, userId))
            } else if (responce.resultCode === 1) {
                dispatch(toggleIsFetching(false))
                dispatch(toggleFollowingInProgress(false, userId))
            }
        })
        .catch((e) => console.log(e))

}

export const unfollowUser = (userId) => (dispatch) => {
    dispatch(toggleFollowingInProgress(true, userId))
    SamAPI.unfollowUser(userId)
        .then(responce => {
            if (responce.resultCode === 0) {
                dispatch(unfollow(userId));

                dispatch(toggleFollowingInProgress(false, userId))
            } else if (responce.resultCode === 1) {
                dispatch(toggleIsFetching(false))
                dispatch(toggleFollowingInProgress(false, userId))
            }
        })
        .catch((e) => console.log(e))
}

export default usersReducer;