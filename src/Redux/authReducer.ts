import { FormAction, stopSubmit } from "redux-form";
import SamServices from "../API/SamAPI";
import { responceApiCodes } from "../Types/responceApiCodes";
import { BaseThunkType, InferActionsTypes } from "./store";

const SamAPI = new SamServices();

const initialState = {
  userId: null as number | null,
  email: null as string | null,
  login: null as string | null,
  isAuth: false,
  captchaUrl: null as string | null,
};

export type initialStateType = typeof initialState;
type ActionsType = InferActionsTypes<typeof actions>;
type ThunkType = BaseThunkType<ActionsType | FormAction>;

const authReducer = (
  state = initialState,
  action: ActionsType
): initialStateType => {
  switch (action.type) {
    case "SN/auth/SET_USER_DATA":
      return {
        ...state,
        ...action.data,
        isAuth: action.data.isAuth,
      };

    case "SN/auth/GET_CAPCTHA_URL":
      return {
        ...state,
        captchaUrl: action.captchaUrl,
      };

    default:
      return state;
  }
};

export const actions = {
  setCapcthaUrl: (captchaUrl: string) =>
    ({ type: "SN/auth/GET_CAPCTHA_URL", captchaUrl } as const),
  setAuthUserData: (
    userId: number | null,
    email: string | null,
    login: string | null,
    isAuth: boolean
  ) =>
    ({
      type: "SN/auth/SET_USER_DATA",
      data: { userId, email, login, isAuth },
    } as const),
};

export const getAuthUserData = (): ThunkType => async (dispatch) => {
  const responce = await SamAPI.authorization();
  if (responce.resultCode === responceApiCodes.Success) {
    dispatch(
      actions.setAuthUserData(
        responce.data.id,
        responce.data.email,
        responce.data.login,
        true
      )
    );
  }
};

export const login =
  (
    email: string,
    password: string,
    rememberMe: boolean,
    captcha: string | null
  ): ThunkType =>
  async (dispatch) => {
    const responce = await SamAPI.login(email, password, rememberMe, captcha);

    if (responce.resultCode === responceApiCodes.Success) {
      dispatch(getAuthUserData());
    } else {
      if (responce.resultCode === responceApiCodes.CaptchaIsRequired) {
        dispatch(getCaptcha());
      }
      let message =
        responce.messages.length > 0 ? responce.messages[0] : "Some error";
      dispatch(stopSubmit("login", { _error: message }));
    }
  };

export const logout = (): ThunkType => async (dispatch) => {
  const responce = await SamAPI.logout();

  if (responce.resultCode === responceApiCodes.Success) {
    dispatch(actions.setAuthUserData(null, null, null, false));
  }
};

export const getCaptcha = (): ThunkType => async (dispatch) => {
  const responce = await SamAPI.getCaptcha();
  const captchaUrl = responce.url;

  dispatch(actions.setCapcthaUrl(captchaUrl));
};

export default authReducer;
