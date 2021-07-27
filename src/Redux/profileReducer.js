import SamServices from "../API/SamAPI";

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
    ],
    profile: null,
    status: '',
    preload: false
}

const profileReducer = (state = initialState, action) => {

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
                profile: {...state.profile, photos: action.photos}
            }

        default:
            return state
    }

}

export const addPost = text => ({ type: ADD_POST, text });
export const deletePost = id => ({ type: DELETE_POST, id });
export const setUserProfile = profile => ({ type: SET_USER_PROFILE, profile });
export const setStatus = status => ({ type: SET_STATUS, status });
export const setPreloaderStatus = status => ({ type: SET_PRELOADER_STATUS, status });
export const setPhotoSuccess = photos => ({type: SET_PHOTO_SUCCESS, photos});

export const getProfile = (id) => async (dispatch) => {
    dispatch(setPreloaderStatus(true))
    const responce = await SamAPI.getUserProfile(id)

    dispatch(setUserProfile(responce))
    dispatch(setPreloaderStatus(false))

}


export const getStatus = (id) => async (dispatch) => {
    const responce = await SamAPI.getStatus(id)

    dispatch(setStatus(responce))
}


export const updateStatus = (status) => async (dispatch) => {
    const responce = await SamAPI.updateStatus(status);
    
    if (responce.resultCode !== 0) {
        dispatch(setStatus(''));
    }
}

export const savePhoto = (file) => async (dispatch) => {
    const responce = await SamAPI.savePhoto(file);
    
    if (responce.resultCode === 0) {
        dispatch(setPhotoSuccess(responce.data.photos));
    }
}

export default profileReducer;