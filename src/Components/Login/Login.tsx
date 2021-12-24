import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router";
import { login } from "../../Redux/authReducer";
import { getCaptchaUrl, getIsAuth, getUserId } from "../../Redux/authSelectors";
import LoginForm from "./LoginForm";

export type LoginFormValuesType = {
  email: string;
  password: string;
  rememberMe: boolean;
  captcha: string;
};

const Login: React.FC<{}> = () => {
  const isAuth = useSelector(getIsAuth);
  const id = useSelector(getUserId);
  const captchaUrl = useSelector(getCaptchaUrl);

  const dispatch = useDispatch();

  const onSubmit = (data: LoginFormValuesType) => {
    dispatch(login(data.email, data.password, data.rememberMe, data.captcha));
  };

  if (isAuth) return <Redirect to={`/profile/${id}`} />;

  return <LoginForm onSubmit={onSubmit} captchaUrl={captchaUrl} />;
};

export default Login;
