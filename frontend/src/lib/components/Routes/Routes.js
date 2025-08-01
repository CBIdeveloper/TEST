import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import AuthGuardRoute from '../auth/AuthGuardRoute';

class Routes extends React.PureComponent {
  submenuRoutes = () => {
    const { props } = this;

    if (!props.menu.subMenus) return '';

    if (props.menu.subMenus.length === 0) return '';

    return props.menu.subMenus.map((subMenu) =>
      // ((!subMenu.ignore && subMenu.display()) || props.forceMode ? (
      ((!subMenu.ignore || props.forceMode) && subMenu.display() ? (
        <Fragment key={subMenu.name}>
          <AuthGuardRoute
            path={`${props.path}${subMenu.getPath()}`}
            component={subMenu.component}
            exact={!subMenu.notExact}
          />
          <Routes
            path={`${props.path}${subMenu.getPath()}`}
            menu={subMenu}
            forceMode={props.forceMode}
          />
        </Fragment>
      ) : (
        ''
      )),
    );
  };

  render() {
    return this.submenuRoutes();
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

Routes.defaultProps = {
  forceMode: false,
};

Routes.propTypes = {
  path: PropTypes.string.isRequired,
  menu: PropTypes.objectOf(Object).isRequired,
  forceMode: PropTypes.bool,
};

export default connect(mapStateToProps, mapDispatchToProps)(Routes);
