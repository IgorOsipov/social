import dialogsReducer from "./dialogsReducer";
import profileReducer from "./profileReducer";


const store = {
    _state: {
        profilePage: {
            posts: [
                { id: 1, message: 'Hello' },
                { id: 2, message: 'World' },
                { id: 3, message: 'Lol' },
                { id: 4, message: 'Kek' }
            ],
            newPostText: ''
        },
        dialogsPage: {
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
    },
    getState(){
        return this._state;
    },
    rerenderEntireTree(){
        console.log('state was changed')
    },
    subscribe(observer) {
        this.rerenderEntireTree = observer;
    },
    dispatch(action){
        this._state.profilePage = profileReducer(this._state.profilePage, action)
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action)
        this.rerenderEntireTree()
    }
}






export default store;