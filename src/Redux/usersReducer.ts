import { Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import SamServices from "../API/SamAPI";
import { updateObjectInArray } from "../Components/App/Helpers/Objects";
import { usersType } from "../Types/types";
import { AppStateType } from "./store";

const FOLLOW = 'users/FOLLOW'
const UNFOLLOW = 'users/UNFOLLOW'
const SET_USERS = 'users/SET_USERS'
const SET_CURRENT_PAGE = 'users/SET_CURRENT_PAGE'
const SET_TOTAL_COUNT = 'users/SET_TOTAL_COUNT'
const TOGGLE_IS_FETCHING = 'users/TOGGLE_IS_FETCHING'
const TOGGLE_IS_FOLLOWING_PROGRESS = 'users/TOGGLE_IS_FOLLOWING_PROGRESS'

const SamAPI = new SamServices();




const initialState = {
    users: [] as Array<usersType>,
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [] as Array<number> //array of users id
}

type initialStateType = typeof initialState;

const usersReducer = (state = initialState, action: ActionsTypes): initialStateType => {

    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userID, 'id', { followed: true })
            }

        case UNFOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userID, 'id', { followed: false })
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

type ActionsTypes = followActionType | unfollowActionType | setUsersActionType
    | setCurrentPageActionType | setTotalCountActionType | toggleFollowingInProgressActiontype
    | toggleIsFetchingActionType;

type followActionType = {
    type: typeof FOLLOW
    userID: number
}
export const follow = (userID: number): followActionType => ({ type: FOLLOW, userID });
type unfollowActionType = {
    type: typeof UNFOLLOW
    userID: number
}
export const unfollow = (userID: number): unfollowActionType => ({ type: UNFOLLOW, userID });
type setUsersActionType = {
    type: typeof SET_USERS
    users: Array<usersType>
}
export const setUsers = (users: Array<usersType>): setUsersActionType => ({ type: SET_USERS, users });
type setCurrentPageActionType = {
    type: typeof SET_CURRENT_PAGE
    currentPage: number
}
export const setCurrentPage = (currentPage: number): setCurrentPageActionType => ({ type: SET_CURRENT_PAGE, currentPage });
type setTotalCountActionType = {
    type: typeof SET_TOTAL_COUNT
    totalCount: number
}
export const setTotalCount = (totalCount: number): setTotalCountActionType => ({ type: SET_TOTAL_COUNT, totalCount });
type toggleIsFetchingActionType = {
    type: typeof TOGGLE_IS_FETCHING
    isFetching: boolean
}
export const toggleIsFetching = (isFetching: boolean): toggleIsFetchingActionType => ({ type: TOGGLE_IS_FETCHING, isFetching });
type toggleFollowingInProgressActiontype = {
    type: typeof TOGGLE_IS_FOLLOWING_PROGRESS
    isFetching: boolean
    userID: number

}
export const toggleFollowingInProgress = (isFetching: boolean, userID: number): toggleFollowingInProgressActiontype => ({ type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userID });

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>;
export const requestUsers = (currentPage: number, pageSize: number): ThunkType => {
    return async (dispatch) => {
        dispatch(toggleIsFetching(true));
        const responce = await SamAPI.getUsers(currentPage, pageSize);
        dispatch(setUsers(responce.items));
        dispatch(setTotalCount(responce.totalCount));
        dispatch(setCurrentPage(currentPage));
        dispatch(toggleIsFetching(false));
    }
}

type ActionCreatorType = (userId: number) => followActionType | unfollowActionType;
const toogleUser = async (dispatch: Dispatch<ActionsTypes>, userId: number, apiMethod: any, actionCreator: ActionCreatorType) => {
    dispatch(toggleFollowingInProgress(true, userId));
    const responce = await apiMethod(userId);

    if (responce.resultCode === 0) {
        dispatch(actionCreator(userId));
    } else if (responce.resultCode === 1) {
        dispatch(toggleIsFetching(false));
    }

    dispatch(toggleFollowingInProgress(false, userId));
}

export const followUser = (userId: number): ThunkType => async (dispatch) => {
    toogleUser(dispatch, userId, SamAPI.followUser.bind(SamAPI), follow);
}

export const unfollowUser = (userId: number): ThunkType => async (dispatch) => {
    toogleUser(dispatch, userId, SamAPI.unfollowUser.bind(SamAPI), unfollow);
}

export default usersReducer;