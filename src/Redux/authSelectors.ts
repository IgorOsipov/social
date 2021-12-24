import { AppStateType } from "./store";

export const getUserId = (state: AppStateType) => {
  return state.auth.userId;
};

export const getIsAuth = (state: AppStateType) => {
  return state.auth.isAuth;
};

export const getCaptchaUrl = (state: AppStateType) => {
  return state.auth.captchaUrl;
};
