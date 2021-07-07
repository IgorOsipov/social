import { stopSubmit } from "redux-form";
import SamServices from "../API/SamAPI";

const SET_USER_DATA = 'auth/SET_USER_DATA';

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

export const getAuthUserData = () => async (dispatch) => {
    const responce = await SamAPI.authorization();
    if (responce.resultCode === 0) {
        dispatch(setAuthUserData(responce.data.id, responce.data.email, responce.data.login, true))
    }
}


export const login = (email, password, rememberMe) => async (dispatch) => {
    const responce = await SamAPI.login(email, password, rememberMe)

    if (responce.resultCode === 0) {
        dispatch(getAuthUserData())
    } else {
        let message = responce.messages.length > 0 ? responce.messages[0] : 'Some error'
        dispatch(stopSubmit('login', { _error: message }))
    }
}

export const logout = () => async (dispatch) => {
    const responce = await SamAPI.logout()

    if (responce.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false))
    }
}

export default authReducer;