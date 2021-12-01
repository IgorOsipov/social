import { FormAction, stopSubmit } from "redux-form";
import SamServices from "../API/SamAPI";
import { responceApiCodes } from "../Types/responceApiCodes";
import { photosType, postsType, profileType } from "../Types/types";
import { BaseThunkType, InferActionsTypes } from "./store";

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
type ActionsTypes = InferActionsTypes<typeof actions>;
type ThunkType = BaseThunkType<ActionsTypes | FormAction>;

const profileReducer = (state = initialState, action: ActionsTypes):initialStateType => {

    switch (action.type) {
        case 'SN/PROFILE/ADD-POST':
            let newPost = {
                id: state.posts.length + 1,
                message: action.text
            }
            return {
                ...state,
                posts: [...state.posts, newPost]
            }

        case 'SN/PROFILE/DELETE_POST':
            return {
                ...state,
                posts: state.posts.filter(p => p.id !== action.id)
            }

        case 'SN/PROFILE/SET_USER_PROFILE':
            return {
                ...state,
                profile: action.profile
            }

        case 'SN/PROFILE/SET_STATUS':
            return {
                ...state,
                status: action.status
            }

        case 'SN/PROFILE/SET_PRELOADER_STATUS':
            return {
                ...state,
                preload: action.status
            }
        
        case 'SN/PROFILE/SET_PHOTO_SUCCESS': 
            return{
                ...state,
                profile: {...state.profile, photos: action.photos} as profileType
            }

        default:
            return state
    }

}

export const actions = {
    addPost: (text: string) => ({ type: 'SN/PROFILE/ADD-POST', text } as const),
    deletePost: (id: number) => ({ type: 'SN/PROFILE/DELETE_POST', id } as const),
    setUserProfile: (profile: profileType) => ({ type: 'SN/PROFILE/SET_USER_PROFILE', profile } as const),
    setStatus: (status: string) => ({ type: 'SN/PROFILE/SET_STATUS', status } as const),
    setPreloaderStatus: (status: boolean) => ({ type: 'SN/PROFILE/SET_PRELOADER_STATUS', status } as const),
    setPhotoSuccess: (photos: photosType) => ({type: 'SN/PROFILE/SET_PHOTO_SUCCESS', photos} as const)
}

export const getProfile = (id: number): ThunkType => async (dispatch) => {
    dispatch(actions.setPreloaderStatus(true));
    const responce = await SamAPI.getUserProfile(id);
    dispatch(actions.setUserProfile(responce));
    dispatch(actions.setPreloaderStatus(false));

}


export const getStatus = (id: number): ThunkType => async (dispatch) => {
    const responce = await SamAPI.getStatus(id);

    dispatch(actions.setStatus(responce));
}


export const updateStatus = (status: string): ThunkType => async (dispatch) => {
    const responce = await SamAPI.updateStatus(status);
    
    if (responce.resultCode !== 0) {
        dispatch(actions.setStatus(''));
    }
}

export const savePhoto = (file: File): ThunkType => async (dispatch) => {
    dispatch(actions.setPreloaderStatus(true));
    const responce = await SamAPI.savePhoto(file);
    
    if (responce.resultCode === responceApiCodes.Success) {
        dispatch(actions.setPhotoSuccess(responce.data.photos));
    }
    dispatch(actions.setPreloaderStatus(false));
}

export const saveProfile = (profile: profileType): ThunkType => async (dispatch, getState) => {
    const userId = getState().auth.userId;

    dispatch(actions.setPreloaderStatus(true));
    const responce = await SamAPI.saveProfile(profile);

    if (responce.resultCode === responceApiCodes.Success) {
        if(userId != null){
            dispatch(getProfile(userId));
        }else{
            throw new Error("userId can't be null");
        }
    }else{
        dispatch(stopSubmit('updateProfile', {_error: responce.messages[0]}));
        dispatch(actions.setPreloaderStatus(false));
        return Promise.reject(responce.messages[0]);
    }
    dispatch(actions.setPreloaderStatus(false));
}

export default profileReducer;