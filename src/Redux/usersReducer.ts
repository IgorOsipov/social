import { Dispatch } from "redux";
import SamServices from "../API/SamAPI";
import { apiResponceType, noDataResponceType } from "../API/SamApiTypes";
import { updateObjectInArray } from "../Components/App/Helpers/Objects";
import { responceApiCodes } from "../Types/responceApiCodes";
import { usersType } from "../Types/types";
import { BaseThunkType, InferActionsTypes, } from "./store";

const SamAPI = new SamServices();

const initialState = {
    users: [] as Array<usersType>,
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    filter: {
        term: '',
        friend: null as null | boolean
    },
    isFetching: false,
    followingInProgress: [] as Array<number> //array of users id
}

export type initialStateType = typeof initialState;
export type FilterType = typeof initialState.filter;
type ActionsTypes = InferActionsTypes<typeof actions>;
type ThunkType = BaseThunkType<ActionsTypes>;

const usersReducer = (state = initialState, action: ActionsTypes): initialStateType => {

    switch (action.type) {
        case 'SN/USERS/FOLLOW':
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userID, 'id', { followed: true })
            }

        case 'SN/USERS/UNFOLLOW':
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userID, 'id', { followed: false })
            }

        case 'SN/USERS/SET_USERS':
            return {
                ...state, users: action.users
            }

        case 'SN/USERS/SET_CURRENT_PAGE':
            return {
                ...state, currentPage: action.currentPage
            }

        case 'SN/USERS/SET_FILTER':
            return {
                ...state, 
                filter: action.payload
            }

        case 'SN/USERS/SET_TOTAL_COUNT':
            return {
                ...state, totalUsersCount: action.totalCount
            }

        case 'SN/USERS/TOGGLE_IS_FETCHING':
            return {
                ...state, isFetching: action.isFetching
            }

        case 'SN/USERS/TOGGLE_IS_FOLLOWING_PROGRESS':
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



export const actions = {
    follow: (userID: number) => ({ type: 'SN/USERS/FOLLOW', userID } as const),
    unfollow: (userID: number) => ({ type: 'SN/USERS/UNFOLLOW', userID } as const),
    setUsers: (users: Array<usersType>) => ({ type: 'SN/USERS/SET_USERS', users } as const),
    setCurrentPage: (currentPage: number) => ({ type: 'SN/USERS/SET_CURRENT_PAGE', currentPage } as const),
    setFilter: (filter: FilterType) => ({ type: 'SN/USERS/SET_FILTER', payload:  filter } as const),
    setTotalCount: (totalCount: number) => ({ type: 'SN/USERS/SET_TOTAL_COUNT', totalCount } as const),
    toggleIsFetching: (isFetching: boolean) => ({ type: 'SN/USERS/TOGGLE_IS_FETCHING', isFetching } as const),
    toggleFollowingInProgress: (isFetching: boolean, userID: number) => ({ type: 'SN/USERS/TOGGLE_IS_FOLLOWING_PROGRESS', isFetching, userID } as const)
}

export const requestUsers = (currentPage: number, pageSize: number, filter: FilterType): ThunkType => {
    return async (dispatch) => {
        dispatch(actions.toggleIsFetching(true));
        const responce = await SamAPI.getUsers(currentPage, pageSize, filter.term, filter.friend);
        dispatch(actions.setUsers(responce.items));
        dispatch(actions.setTotalCount(responce.totalCount));
        dispatch(actions.toggleIsFetching(false));
    }
}

const toogleUser = async (dispatch: Dispatch<ActionsTypes>, userId: number, apiMethod: (userId: number) => Promise<apiResponceType & noDataResponceType>, actionCreator: (userId: number) => ActionsTypes) => {
    dispatch(actions.toggleFollowingInProgress(true, userId));
    const responce = await apiMethod(userId);

    if (responce.resultCode === responceApiCodes.Success) {
        dispatch(actionCreator(userId));
    } else if (responce.resultCode === responceApiCodes.Error) {
        dispatch(actions.toggleIsFetching(false));
    }

    dispatch(actions.toggleFollowingInProgress(false, userId));
}

export const followUser = (userId: number): ThunkType => async (dispatch) => {
    await toogleUser(dispatch, userId, SamAPI.followUser.bind(SamAPI), actions.follow);
}

export const unfollowUser = (userId: number): ThunkType => async (dispatch) => {
    await toogleUser(dispatch, userId, SamAPI.unfollowUser.bind(SamAPI), actions.unfollow);
}

export default usersReducer;