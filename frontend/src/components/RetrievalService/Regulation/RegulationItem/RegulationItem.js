import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import Path from '../../../../utils/path/path';
import UrlParser from '../../../../utils/parsers/urlParser';

import './RegulationItem.scss';

class RegulationItem extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { isHover: false };
  }

  setIsHover = (isHover) => {
    this.setState({ isHover });
  };

  imageSource = () => {
    const { props, state } = this;
    return state.isHover ? props.hoverImage : props.normalImage;
  };

  regulationDetailPage = () => {
    const { props } = this;
    return UrlParser([Path.regulationDetailPath, props.type]);
  };

  render() {
    const { props } = this;

    return (
      <NavLink
        className="regulation-item"
        to={this.regulationDetailPage()}
        onMouseOver={() => this.setIsHover(true)}
        onMouseLeave={() => this.setIsHover(false)}
      >
        <img
          className="regulation-image"
          src={this.imageSource()}
          alt="regulation-item"
        />
      </NavLink>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

RegulationItem.propTypes = {
  normalImage: PropTypes.string.isRequired,
  hoverImage: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(RegulationItem);
