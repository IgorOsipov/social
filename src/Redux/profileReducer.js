const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const SET_USER_PROFILE = 'SET_USER_PROFILE';

const initialState = {
    posts: [
        { id: 1, message: 'Hello' },
        { id: 2, message: 'World' },
        { id: 3, message: 'Lol' },
        { id: 4, message: 'Kek' }
    ],
    newPostText: '',
    profile: null
}

const profileReducer = (state = initialState, action) => {

    switch (action.type) {
        case ADD_POST:
            let newPost = {
                id: state.posts.length + 1,
                message: state.newPostText
            }
            return {
                ...state,
                posts: [...state.posts, newPost],
                newPostText: ''
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

        default:
            return state
    }

}

export const addPostActionCreator = () => ({ type: ADD_POST })
export const updateNewPostTextActionCreator = text => ({ type: UPDATE_NEW_POST_TEXT, text })
export const setUserProfile = (profile) => ({ type: SET_USER_PROFILE, profile })

export default profileReducer;