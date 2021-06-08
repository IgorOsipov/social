const UPDATE_MESSAGE_TEXT = 'UPDATE-MESSAGE-TEXT';
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
    ],
    newMessageText: ''
}

const dialogsReducer = (state = initialState, action) => {

    switch (action.type) {
        case ADD_MESSAGE:
            {
                let newState = {...state}
                let newMessage = {
                    id: state.messagesData.length + 1,
                    message: state.newMessageText
                }
                newState.messagesData.push(newMessage)
                newState.newMessageText = ''
                return newState
            }
        case UPDATE_MESSAGE_TEXT:
            {
                let newState = {...state}
                newState.newMessageText += action.text
                return newState
            }
        default:
            return state
    }
}

export const addMessageActionCreator = () => ({ type: ADD_MESSAGE })
export const updateNewMessageTextActionCreator = text => ({ type: UPDATE_MESSAGE_TEXT, text })

export default dialogsReducer;