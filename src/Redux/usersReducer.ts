import { Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import SamServices from "../API/SamAPI";
import { updateObjectInArray } from "../Components/App/Helpers/Objects";
import { usersType } from "../Types/types";
import { AppStateType, InferActionsTypes } from "./store";

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
        case 'FOLLOW':
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userID, 'id', { followed: true })
            }

        case 'UNFOLLOW':
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userID, 'id', { followed: false })
            }

        case 'SET_USERS':
            return {
                ...state, users: action.users
            }

        case 'SET_CURRENT_PAGE':
            return {
                ...state, currentPage: action.currentPage
            }

        case 'SET_TOTAL_COUNT':
            return {
                ...state, totalUsersCount: action.totalCount
            }

        case 'TOGGLE_IS_FETCHING':
            return {
                ...state, isFetching: action.isFetching
            }

        case 'TOGGLE_IS_FOLLOWING_PROGRESS':
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

type ActionsTypes = InferActionsTypes<typeof actions>;

export const actions = {
    follow: (userID: number) => ({ type: 'FOLLOW', userID } as const),
    unfollow: (userID: number) => ({ type: 'UNFOLLOW', userID } as const),
    setUsers: (users: Array<usersType>) => ({ type: 'SET_USERS', users } as const),
    setCurrentPage: (currentPage: number) => ({ type: 'SET_CURRENT_PAGE', currentPage } as const),
    setTotalCount: (totalCount: number) => ({ type: 'SET_TOTAL_COUNT', totalCount } as const),
    toggleIsFetching: (isFetching: boolean) => ({ type: 'TOGGLE_IS_FETCHING', isFetching } as const),
    toggleFollowingInProgress: (isFetching: boolean, userID: number) => ({ type: 'TOGGLE_IS_FOLLOWING_PROGRESS', isFetching, userID } as const)
}


type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>;
export const requestUsers = (currentPage: number, pageSize: number): ThunkType => {
    return async (dispatch) => {
        dispatch(actions.toggleIsFetching(true));
        const responce = await SamAPI.getUsers(currentPage, pageSize);
        dispatch(actions.setUsers(responce.items));
        dispatch(actions.setTotalCount(responce.totalCount));
        dispatch(actions.setCurrentPage(currentPage));
        dispatch(actions.toggleIsFetching(false));
    }
}

const toogleUser = async (dispatch: Dispatch<ActionsTypes>, userId: number, apiMethod: any, actionCreator:(userId: number) => ActionsTypes) => {
    dispatch(actions.toggleFollowingInProgress(true, userId));
    const responce = await apiMethod(userId);

    if (responce.resultCode === 0) {
        dispatch(actionCreator(userId));
    } else if (responce.resultCode === 1) {
        dispatch(actions.toggleIsFetching(false));
    }

    dispatch(actions.toggleFollowingInProgress(false, userId));
}

export const followUser = (userId: number): ThunkType => async (dispatch) => {
    toogleUser(dispatch, userId, SamAPI.followUser.bind(SamAPI), actions.follow);
}

export const unfollowUser = (userId: number): ThunkType => async (dispatch) => {
    toogleUser(dispatch, userId, SamAPI.unfollowUser.bind(SamAPI), actions.unfollow);
}

export default usersReducer;