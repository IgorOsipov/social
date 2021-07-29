const ADD_MESSAGE = 'dialogs/ADD-MESSAGE';


type dialogsDataType = {
    id: number
    name: string | null
}
type messagesDataType = {
    id: number
    message: string | null
}
const initialState = {
    dialogsData: [
        { id: 1, name: 'Kolya' },
        { id: 2, name: 'Vasya' },
        { id: 3, name: 'Petya' }
    ] as Array<dialogsDataType>,
    messagesData: [
        { id: 1, message: 'Hi, man' },
        { id: 2, message: 'Hello World' },
        { id: 3, message: 'Bye' },
        { id: 4, message: 'It\'s me' }
    ] as Array<messagesDataType>
}

export type initialStateType = typeof initialState;

const dialogsReducer = (state = initialState, action: any):initialStateType  => {

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

type addMessageActionType = {
    type: typeof ADD_MESSAGE
    newPost: string
}
export const addMessage = (newPost: string): addMessageActionType => ({ type: ADD_MESSAGE, newPost });

export default dialogsReducer;