import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const renderMergedProps = (component, ...rest) => {
  const finalProps = Object.assign({}, ...rest);
  return React.createElement(component, finalProps);
};

export const PublicRoute = ({
  isAuthenticated,
  component: Component,
  ...rest
}) => (
  <Route
    {...rest}
    render={routeProps =>
      isAuthenticated ? (
        <Redirect to="/app/hive" />
      ) : (
        renderMergedProps(Component, routeProps, rest)
      )
    }
  />
);

const mapStateToProps = state => ({
  isAuthenticated: !!state.auth.uid
});

export default connect(mapStateToProps)(PublicRoute);