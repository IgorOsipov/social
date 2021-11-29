import { stopSubmit } from "redux-form";
import SamServices from "../API/SamAPI";
import { photosType, postsType, profileType } from "../Types/types";

const ADD_POST = 'profile/ADD-POST';
const DELETE_POST = 'profile/DELETE_POST';
const SET_USER_PROFILE = 'profile/SET_USER_PROFILE';
const SET_STATUS = 'profile/SET_STATUS';
const SET_PRELOADER_STATUS = 'profile/SET_PRELOADER_STATUS';
const SET_PHOTO_SUCCESS = 'profile/SET_PHOTO_SUCCESS'

const SamAPI = new SamServices()


const initialState = {
    posts: [
        { id: 1, message: 'Hello' },
        { id: 2, message: 'World' },
        { id: 3, message: 'Lol' },
        { id: 4, message: 'Kek' }
    ] as Array<postsType>,
    profile: null as profileType | null,
    status: '',
    preload: false
}

export type initialStateType = typeof initialState;

const profileReducer = (state = initialState, action: any):initialStateType => {

    switch (action.type) {
        case ADD_POST:
            let newPost = {
                id: state.posts.length + 1,
                message: action.text
            }
            return {
                ...state,
                posts: [...state.posts, newPost]
            }

        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(p => p.id !== action.id)
            }

        case SET_USER_PROFILE:
            return {
                ...state,
                profile: action.profile
            }

        case SET_STATUS:
            return {
                ...state,
                status: action.status
            }

        case SET_PRELOADER_STATUS:
            return {
                ...state,
                preload: action.status
            }
        
        case SET_PHOTO_SUCCESS: 
            return{
                ...state,
                profile: {...state.profile, photos: action.photos} as profileType
            }

        default:
            return state
    }

}

type addPostActionType = {
    type: typeof ADD_POST,
    text: string
}
export const addPost = (text: string):addPostActionType => ({ type: ADD_POST, text });
type deletePostActionType = {
    type: typeof DELETE_POST
    id: number
}
export const deletePost = (id: number):deletePostActionType => ({ type: DELETE_POST, id });
type setUserProfileActionType = {
    type: typeof SET_USER_PROFILE
    profile: profileType
}
export const setUserProfile = (profile: profileType):setUserProfileActionType => ({ type: SET_USER_PROFILE, profile });
type setStatusActionType = {
    type: typeof SET_STATUS
    status: string
}
export const setStatus = (status: string):setStatusActionType => ({ type: SET_STATUS, status });
type setPreloaderStatusActionType = {
    type: typeof SET_PRELOADER_STATUS
    status: boolean
}
export const setPreloaderStatus = (status: boolean):setPreloaderStatusActionType => ({ type: SET_PRELOADER_STATUS, status });
type setPhotoSuccessActionType = {
    type: typeof SET_PHOTO_SUCCESS
    photos: photosType
}
export const setPhotoSuccess = (photos: photosType):setPhotoSuccessActionType => ({type: SET_PHOTO_SUCCESS, photos});

export const getProfile = (id: number) => async (dispatch: any) => {
    dispatch(setPreloaderStatus(true));
    const responce = await SamAPI.getUserProfile(id);
    dispatch(setUserProfile(responce));
    dispatch(setPreloaderStatus(false));

}


export const getStatus = (id: number) => async (dispatch: any) => {
    const responce = await SamAPI.getStatus(id);

    dispatch(setStatus(responce));
}


export const updateStatus = (status: string) => async (dispatch: any) => {
    const responce = await SamAPI.updateStatus(status);
    
    if (responce.resultCode !== 0) {
        dispatch(setStatus(''));
    }
}

export const savePhoto = (file: any) => async (dispatch: any) => {
    dispatch(setPreloaderStatus(true));
    const responce = await SamAPI.savePhoto(file);
    
    if (responce.resultCode === 0) {
        dispatch(setPhotoSuccess(responce.data.photos));
    }
    dispatch(setPreloaderStatus(false));
}

export const saveProfile = (profile: profileType) => async (dispatch: any, getState: any) => {
    const userId = getState().auth.userId;

    dispatch(setPreloaderStatus(true));
    const responce = await SamAPI.saveProfile(profile);

    if (responce.resultCode === 0) {
        dispatch(getProfile(userId));
    }else{
        dispatch(stopSubmit('updateProfile', {_error: responce.messages[0]}));
        dispatch(setPreloaderStatus(false));
        return Promise.reject(responce.messages[0]);
    }
    dispatch(setPreloaderStatus(false));
}

export default profileReducer;