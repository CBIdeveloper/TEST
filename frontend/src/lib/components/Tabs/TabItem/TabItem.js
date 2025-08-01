import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import './TabItem.scss';

class TabItem extends React.PureComponent {
  tabItemClassname = () => {
    const { props } = this;
    return props.isSelected
      ? `tab-item select ${props.color}`
      : `tab-item ${props.color}`;
  };

  render() {
    const { props } = this;

    return (
      <NavLink className={this.tabItemClassname()} to={props.link}>
        {props.name}
      </NavLink>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

TabItem.defaultProps = {
  color: '',
};

TabItem.propTypes = {
  name: PropTypes.string.isRequired,
  isSelected: PropTypes.bool.isRequired,
  link: PropTypes.string.isRequired,
  color: PropTypes.string,
};

export default connect(mapStateToProps, mapDispatchToProps)(TabItem);
