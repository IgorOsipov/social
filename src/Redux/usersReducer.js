const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = 'SET_USERS'

const initialState = {
    users: [
        { id: 1, followed: false, name: 'Gera', status: 'Hello', location: { city: 'Minsk', country: 'Belarus' } },
        { id: 2, followed: true, name: 'Masha', status: 'Hello', location: { city: 'Kiev', country: 'Ukraine' } },
        { id: 3, followed: false, name: 'Sasha', status: 'Hello', location: { city: 'Moscow', country: 'Russia' } },
        { id: 4, followed: false, name: 'Yasha', status: 'Hello', location: { city: 'Minsk', country: 'Belarus' } },
        { id: 5, followed: false, name: 'Gera', status: 'Hello', location: { city: 'Minsk', country: 'Belarus' } },
        { id: 6, followed: true, name: 'Masha', status: 'Hello', location: { city: 'Kiev', country: 'Ukraine' } },
        { id: 7, followed: false, name: 'Sasha', status: 'Hello', location: { city: 'Moscow', country: 'Russia' } },
        { id: 8, followed: false, name: 'Yasha', status: 'Hello', location: { city: 'Minsk', country: 'Belarus' } }
    ]
}

const usersReducer = (state = initialState, action) => {

    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    if(u.id === action.userID){
                        return {...u, followed: true}
                    }
                    return u
                })
            }
        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    if(u.id === action.userID){
                        return {...u, followed: false}
                    }
                    return u
                })
            }
        case SET_USERS:
            return{
                ...state, users: [ ...state.users, ...action.users ]
            }    
        default:
            return state
    }

}

export const followAC = (userID) => ({ type: FOLLOW, userID })
export const unfollowAC = (userID) => ({ type: UNFOLLOW, userID })
export const setUsersAC = (users) => ({ type: SET_USERS, users })

export default usersReducer;