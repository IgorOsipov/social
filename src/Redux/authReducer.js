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
                isAuth: true
            }

        default:
            return state
    }
}

export const setAuthUserData = (userId, email, login) => ({ type: SET_USER_DATA, data: { userId, email, login } })

export const setAuthUser = () => {
    return (dispatch) => {
        SamAPI.authorization()
        .then(r => {
            if(r.resultCode === 0){
                dispatch(setAuthUserData(r.data.id, r.data.email, r.data.login))
            }
        })
    }
}

export default authReducer;