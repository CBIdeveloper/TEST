import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Route, Redirect, withRouter } from 'react-router-dom';

import Path from '../../../utils/path/path';
import QueryType from '../../../utils/types/QueryType';
import { createQuery } from '../../../utils/parsers/queryParser';
import { isUserLogin, getChangePassword } from '../../../utils/auth/auth';

class AuthGuardRoute extends React.PureComponent {
  redirectURL = () => {
    const { props } = this;
    let query = '';
    if (props.location.pathname !== Path.mainPath) {
      query = createQuery({
        [QueryType.REDIRECT]: btoa(
          `${props.location.pathname}${props.location.search}`,
        ),
      });
    }
    return {
      pathname: Path.loginPath,
      search: query,
    };
  };

  renderRoute = (routeProps) => {
    const { props } = this;
    const { component: Component } = props;
    if (isUserLogin()) {
      if (props.ignorePasswordCheck) {
        return <Component {...routeProps} path={props.path} />;
      }
      return getChangePassword() ? (
        <Redirect to={Path.changePasswordPath} />
      ) : (
        <Component {...routeProps} path={props.path} />
      );
    }
    return <Redirect to={this.redirectURL()} />;
  };

  render() {
    const { props } = this;
    const { component: Component, ...rest } = props;

    return <Route {...rest} render={this.renderRoute} />;
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

AuthGuardRoute.defaultProps = {
  ignorePasswordCheck: false,
};

AuthGuardRoute.propTypes = {
  path: PropTypes.string.isRequired,
  ignorePasswordCheck: PropTypes.bool,
  component: PropTypes.elementType.isRequired,
  location: PropTypes.objectOf(Object).isRequired,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AuthGuardRoute),
);
