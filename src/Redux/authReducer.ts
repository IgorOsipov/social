import { stopSubmit } from "redux-form";
import SamServices from "../API/SamAPI";
import { responceApiCodes } from "../Types/responceApiCodes";

const SET_USER_DATA = 'auth/SET_USER_DATA';
const GET_CAPCTHA_URL = 'auth/GET_CAPCTHA_URL';

const SamAPI = new SamServices();

const initialState = {
    userId: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false as boolean,
    captchaUrl: null as string | null
}

export type initialStateType = typeof initialState;

const authReducer = (state = initialState, action:any): initialStateType => {

    switch (action.type) {

        case SET_USER_DATA:

            return {
                ...state,
                ...action.data,
                isAuth: action.data.isAuth
            }

        case GET_CAPCTHA_URL:
            return{
                ...state, 
                captchaUrl: action.captchaUrl
            }

        default:
            return state;
    }
}

type setCapcthaUrlactionType = {
    type: typeof GET_CAPCTHA_URL
    captchaUrl: string
}
export const setCapcthaUrl = (captchaUrl: string): setCapcthaUrlactionType => ({ type: GET_CAPCTHA_URL, captchaUrl});

type setAuthUserDataActionDataType ={
    userId: number | null
    email: string | null
    login: string | null
    isAuth: boolean
}
type setAuthUserDataActionType = {
    type: typeof SET_USER_DATA,
    data: setAuthUserDataActionDataType
}
export const setAuthUserData = (userId: number | null, email: string | null, login: string | null, isAuth: boolean): setAuthUserDataActionType  => (
    { type: SET_USER_DATA, data: { userId, email, login, isAuth } });

export const getAuthUserData = () => async (dispatch: any) => {
    const responce = await SamAPI.authorization();
    if (responce.resultCode === responceApiCodes.Success) {
        dispatch(setAuthUserData(responce.data.id, responce.data.email, responce.data.login, true));
    }
}


export const login = (email: string, password: string, rememberMe: boolean, captcha: string) => async (dispatch:any) => {
    const responce = await SamAPI.login(email, password, rememberMe, captcha);

    if (responce.resultCode === responceApiCodes.Success) {
        dispatch(getAuthUserData());
    } else {
        if(responce.resultCode === responceApiCodes.CaptchaIsRequired){
            dispatch(getCaptcha());
        }
        let message = responce.messages.length > 0 ? responce.messages[0] : 'Some error';
        dispatch(stopSubmit('login', { _error: message }));
    }
}

export const logout = () => async (dispatch:any) => {
    const responce = await SamAPI.logout();

    if (responce.resultCode === responceApiCodes.Success) {
        dispatch(setAuthUserData(null, null, null, false))
    }
}

export const getCaptcha = () => async (dispatch: any) => {
    const responce = await SamAPI.getCaptcha();
    const captchaUrl = responce.url;

    dispatch(setCapcthaUrl(captchaUrl));
}


export default authReducer;