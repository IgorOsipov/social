const ADD_MESSAGE = 'ADD-MESSAGE';

const initialState = {
    dialogsData: [
        { id: 1, name: 'Kolya' },
        { id: 2, name: 'Vasya' },
        { id: 3, name: 'Petya' }
    ],
    messagesData: [
        { id: 1, message: 'Hi, man' },
        { id: 2, message: 'Hello World' },
        { id: 3, message: 'Bye' },
        { id: 4, message: 'It\'s me' }
    ]
}

const dialogsReducer = (state = initialState, action) => {

    switch (action.type) {

        case ADD_MESSAGE:
            let newMessage = {
                id: state.messagesData.length + 1,
                message: action.newPost
            }
            return {
                ...state,
                messagesData: [...state.messagesData, newMessage]
            }

        default:
            return state
    }
}

export const addMessageActionCreator = (newPost) => ({ type: ADD_MESSAGE, newPost })

export default dialogsReducer;