import SamServices from "../API/SamAPI";
import { updateObjectInArray } from "../Components/App/Helpers/Objects";

const FOLLOW = 'users/FOLLOW'
const UNFOLLOW = 'users/UNFOLLOW'
const SET_USERS = 'users/SET_USERS'
const SET_CURRENT_PAGE = 'users/SET_CURRENT_PAGE'
const SET_TOTAL_COUNT = 'users/SET_TOTAL_COUNT'
const TOGGLE_IS_FETCHING = 'users/TOGGLE_IS_FETCHING'
const TOGGLE_IS_FOLLOWING_PROGRESS = 'users/TOGGLE_IS_FOLLOWING_PROGRESS'

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
                users: updateObjectInArray(state.users, action.userID, 'id', {followed: true})
            }

        case UNFOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userID, 'id', {followed: false})
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

export const follow = userID => ({ type: FOLLOW, userID });
export const unfollow =userID => ({ type: UNFOLLOW, userID });
export const setUsers = users => ({ type: SET_USERS, users });
export const setCurrentPage = currentPage => ({ type: SET_CURRENT_PAGE, currentPage });
export const setTotalCount = totalCount => ({ type: SET_TOTAL_COUNT, totalCount });
export const toggleIsFetching = isFetching => ({ type: TOGGLE_IS_FETCHING, isFetching });
export const toggleFollowingInProgress = (isFetching, userID) => ({ type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userID });

export const requestUsers = (currentPage, pageSize) => async (dispatch) => {
    dispatch(toggleIsFetching(true));
    const responce = await SamAPI.getUsers(currentPage, pageSize)
    dispatch(setUsers(responce.items));
    dispatch(setTotalCount(responce.totalCount));
    dispatch(setCurrentPage(currentPage));
    dispatch(toggleIsFetching(false));
}

const toogleUser = async (dispatch, userId, apiMethod, actionCreator) => {
    dispatch(toggleFollowingInProgress(true, userId));
    const responce = await apiMethod(userId);

    if (responce.resultCode === 0) {
        dispatch(actionCreator(userId));
    } else if (responce.resultCode === 1) {
        dispatch(toggleIsFetching(false));
    }

    dispatch(toggleFollowingInProgress(false, userId));
}

export const followUser = (userId) => async (dispatch) => {
    toogleUser(dispatch, userId, SamAPI.followUser.bind(SamAPI), follow);
}

export const unfollowUser = (userId) => async (dispatch) => {
    toogleUser(dispatch, userId, SamAPI.unfollowUser.bind(SamAPI), unfollow);
}

export default usersReducer;