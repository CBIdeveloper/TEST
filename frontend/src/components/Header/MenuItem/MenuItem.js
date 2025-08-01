import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import ButtonDiv from '../../../lib/components/ButtonDiv/ButtonDiv';

import urlParser from '../../../utils/parsers/urlParser';

import './MenuItem.scss';

import arrowDown from '../../../assets/images/icons/arrow_down.png';

class MenuItem extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { isMenuOpen: false };
    this.menuRef = React.createRef();
    this.subMenuRef = React.createRef();
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
    document.addEventListener('touchstart', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
    document.removeEventListener('touchstart', this.handleClickOutside);
  }

  setIsMenuOpen = (isMenuOpen) => {
    this.setState({ isMenuOpen });
  };

  toggleIsMenuOpen = () => {
    const { state } = this;
    this.setIsMenuOpen(!state.isMenuOpen);
  };

  handleClickOutside = (event) => {
    const { state } = this;
    if (state.isMenuOpen) {
      if (
        this.subMenuRef &&
        !this.subMenuRef.current.contains(event.target) &&
        !this.menuRef.current.contains(event.target)
      ) {
        this.setIsMenuOpen(false);
      }
    }
  };

  displaySubMenus = () => {
    const { props, state } = this;
    return state.isMenuOpen ? (
      <div className="sub-menus" ref={this.subMenuRef}>
        {props.subMenus
          .filter((item) => !item.hide && item.display())
          .map((item) => (
            <NavLink
              className="sub-menu-item"
              to={this.menuLink(item.path)}
              key={item.name}
            >
              {item.name}
            </NavLink>
          ))}
      </div>
    ) : (
      ''
    );
  };

  menuLink = (path) => {
    const { props } = this;
    if (props.fixed) return path;
    return props.singleMenu
      ? `/${props.path}`
      : urlParser([`/${props.path}`, path]);
  };

  arrowClassname = () => {
    const { state } = this;
    return state.isMenuOpen ? 'arrow-icon open' : 'arrow-icon';
  };

  render() {
    const { props } = this;

    return (
      <ButtonDiv
        className="menu-item"
        onClick={this.toggleIsMenuOpen}
        elementRef={this.menuRef}
      >
        <div className="menu-text">{props.menuName}</div>
        <img src={arrowDown} className={this.arrowClassname()} alt="arrow" />
        {this.displaySubMenus()}
      </ButtonDiv>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

MenuItem.defaultProps = {
  path: '',
  subMenus: [],
  singleMenu: false,
  fixed: false,
};

MenuItem.propTypes = {
  menuName: PropTypes.string.isRequired,
  path: PropTypes.string,
  subMenus: PropTypes.arrayOf(Object),
  singleMenu: PropTypes.bool,
  fixed: PropTypes.bool,
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuItem);
