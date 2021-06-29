import SamServices from "../API/SamAPI";

const SET_USER_DATA = 'SET_USER_DATA';

const SamAPI = new SamServices();

const initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false
}

const authReducer = (state = initialState, action) => {

    switch (action.type) {

        case SET_USER_DATA:

            return {
                ...state,
                ...action.data,
                isAuth: action.data.isAuth
            }

        default:
            return state
    }
}

export const setAuthUserData = (userId, email, login, isAuth) => ({ type: SET_USER_DATA, data: { userId, email, login, isAuth } })

export const getAuthUserData = () => {
    return (dispatch) => {
        SamAPI.authorization()
        .then(r => {
            if(r.resultCode === 0){
                dispatch(setAuthUserData(r.data.id, r.data.email, r.data.login, true))
            }
        })
    }
}

export const login = (email, password, rememberMe) => {
    return (dispatch) => {
        SamAPI.login(email, password, rememberMe)
        .then(r => {
            if(r.resultCode === 0){
                dispatch(getAuthUserData())
            }
        })
    }
}

export const logout = () => {
    return (dispatch) => {
        SamAPI.logout()
        .then(r => {
            if(r.resultCode === 0){
                dispatch(setAuthUserData(null, null, null, false))
            }
        })
    }
}

export default authReducer;