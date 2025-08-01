import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { NavLink, withRouter } from 'react-router-dom';

import Path from '../../../utils/path/path';
import { parsePath } from '../../../utils/parsers/locationParser';

import './Breadcrumb.scss';

class Breadcrumb extends React.PureComponent {
  displayBreadcrumb = () => {
    const { props } = this;
    // console.log(props.menu)
    const menuArray = parsePath(props.location.pathname);
    const breadcrumb = [
      <NavLink
        exact
        className="page-name"
        activeClassName="active"
        to={Path.mainPath}
        key={Path.mainPath}
      >
        {props.language.breadcrumb.mainPage}
      </NavLink>,
    ];

    if (menuArray[0]) {
      const mainMenuItem = props.menu.getMainMenu(menuArray[0]);
      if (mainMenuItem === undefined) return '';
      breadcrumb.push(
        <span className="prefix-container" key={mainMenuItem.name}>
          <div className="arrow">{props.language.breadcrumb.arrow}</div>
          <NavLink
            exact
            className={`page-name ${this.disableClassname(mainMenuItem)}`}
            activeClassName="active"
            to={mainMenuItem.getPath()}
            key={mainMenuItem.name}
          >
            {mainMenuItem.name}
          </NavLink>
        </span>,
      );

      for (let index = 1; index < menuArray.length; index += 1) {
        const subMenuArray = menuArray.slice(0, index + 1);
        const subMenuItem = props.menu.getSubMenu(subMenuArray);
        if (subMenuItem === undefined) {
          break;
        }
        breadcrumb.push(
          <span className="prefix-container" key={subMenuItem.path}>
            <div className="arrow">{props.language.breadcrumb.arrow}</div>
            <NavLink
              exact
              className={`page-name ${this.disableClassname(subMenuItem)}`}
              activeClassName="active"
              to={props.menu.getMenuPath(subMenuArray)}
            >
              {subMenuItem.name}
            </NavLink>
          </span>,
        );
      }
    }

    return breadcrumb;
  };

  disableClassname = (item) => (item.disableInBreadcrumb ? 'disable' : '');

  render() {
    const { props } = this;

    return <div className="breadcrumb">{this.displayBreadcrumb()}</div>;
  }
}

const mapStateToProps = (state) => ({
  language: state.language.languageInfo.languageObject,
  menu: state.menu.menu.menuInstance,
});

const mapDispatchToProps = (dispatch) => ({});

Breadcrumb.propTypes = {
  language: PropTypes.objectOf(Object).isRequired,
  menu: PropTypes.objectOf(Object).isRequired,
  location: PropTypes.objectOf(Object).isRequired,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Breadcrumb),
);
