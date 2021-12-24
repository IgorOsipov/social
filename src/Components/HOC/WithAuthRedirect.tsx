import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { AppStateType } from "../../Redux/store";

const mapStateToProps = (state: AppStateType) => ({
  isAuth: state.auth.isAuth,
});

export const withAuthRedirect = (Component: React.ComponentType) => {
  class RedirectComponent extends React.Component<{ isAuth: boolean }> {
    render() {
      if (!this.props.isAuth) return <Redirect to="/login" />;
      return <Component {...this.props} />;
    }
  }
  return connect(mapStateToProps, {})(RedirectComponent);
};
