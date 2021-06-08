const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';

const initialState = {
    posts: [
        { id: 1, message: 'Hello' },
        { id: 2, message: 'World' },
        { id: 3, message: 'Lol' },
        { id: 4, message: 'Kek' }
    ],
    newPostText: ''
}

const profileReducer = (state = initialState, action) => {

    switch (action.type) {
        case ADD_POST:
            {
                let newPost = {
                    id: state.posts.length + 1,
                    message: state.newPostText
                }
                let newState = { ...state }
                newState.posts = [...state.posts]
                newState.posts.push(newPost)
                newState.newPostText = ''
                return newState
            }
        case UPDATE_NEW_POST_TEXT:
            {
                let newState = { ...state }
                newState.newPostText += action.text
                return newState
            }
        default:
            return state
    }

}

export const addPostActionCreator = () => ({ type: ADD_POST })
export const updateNewPostTextActionCreator = text => ({ type: UPDATE_NEW_POST_TEXT, text })

export default profileReducer;