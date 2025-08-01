import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { NavLink, withRouter } from 'react-router-dom';

import './SideMenu.scss';

class SideMenu extends React.PureComponent {
  menuPath = (path) => {
    const { props } = this;
    return props.menu.getMenuPath([...props.menuPrefix, path]);
  };

  displayMenuList = () => {
    const { props } = this;
    return props.menuList.map((item) =>
      (item.hide || !item.display() ? (
        ''
      ) : (
        <NavLink
          className="sub-menu-item"
          activeClassName="active"
          to={this.menuPath(item.path)}
          key={item.path}
        >
          {item.name}
        </NavLink>
      )),
    );
  };

  render() {
    const { props } = this;

    return (
      <div className={`side-menu ${props.color}`}>
        <div className="menu-title">{props.menuName}</div>
        <div className="sub-menu-list">{this.displayMenuList()}</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  language: state.language.languageInfo.languageObject,
  menu: state.menu.menu.menuInstance,
});

const mapDispatchToProps = (dispatch) => ({});

SideMenu.defaultProps = {
  menuPrefix: [],
  color: '',
};

SideMenu.propTypes = {
  language: PropTypes.objectOf(Object).isRequired,
  menu: PropTypes.objectOf(Object).isRequired,
  menuName: PropTypes.string.isRequired,
  menuList: PropTypes.arrayOf(Object).isRequired,
  menuPrefix: PropTypes.arrayOf(Object).isRequired,
  color: PropTypes.string,
  history: PropTypes.objectOf(Object).isRequired,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SideMenu),
);
