import SamServices from "../API/SamAPI";

const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';

const SamAPI = new SamServices()

const initialState = {
    posts: [
        { id: 1, message: 'Hello' },
        { id: 2, message: 'World' },
        { id: 3, message: 'Lol' },
        { id: 4, message: 'Kek' }
    ],
    newPostText: '',
    profile: null,
    status: ''
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

        case UPDATE_NEW_POST_TEXT:
            return {
                ...state,
                newPostText: state.newPostText + action.text
            }

        case SET_USER_PROFILE:
            return {
                ...state,
                profile: action.profile
            }

        case SET_STATUS:
            return{
                ...state,
                status: action.status
            }

        default:
            return state
    }

}

export const addPost = (text) => ({ type: ADD_POST, text })
export const updateNewPostTextActionCreator = text => ({ type: UPDATE_NEW_POST_TEXT, text })
export const setUserProfile = profile => ({ type: SET_USER_PROFILE, profile })
export const setStatus = status => ({type: SET_STATUS, status})

export const getProfile = (id) => {
    return (dispatch) => {
        SamAPI.getUserProfile(id)
            .then(p => {
                dispatch(setUserProfile(p))
            })
    }
}

export const getStatus = (id) => {
    return (dispatch) => {
        SamAPI.getStatus(id)
        .then(s=>{
            dispatch(setStatus(s))
        })
    }
}

export const updateStatus = (status) => {
    return (dispatch) => {
        SamAPI.updateStatus(status)
        .then(s=>{
            if(s.resultCode !== 0){
                dispatch(setStatus(''))
            }
        })
    }
}

export default profileReducer;