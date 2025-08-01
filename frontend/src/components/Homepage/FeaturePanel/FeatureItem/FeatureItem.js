import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import ButtonDiv from '../../../../lib/components/ButtonDiv/ButtonDiv';

import ModalHelper from '../../../../utils/helper/ModalHelper';

import './FeatureItem.scss';

class FeatureItem extends React.PureComponent {
  navigateLink = () => {
    const { props } = this;
    return props.access() ? props.link : '/';
  };

  handleOnClicked = () => {
    const { props } = this;
    if (props.access()) {
      if (props.type === 'button') {
        props.onClick();
      }
    } else {
      ModalHelper.openErrorModal({
        message: '無此功能權限',
      });
    }
  };

  render() {
    const { props } = this;

    return props.type === 'link' ? (
      <NavLink
        className={`feature-item ${props.className}`}
        to={this.navigateLink()}
        onClick={this.handleOnClicked}
      >
        <img src={props.image} className="icon" alt="icon" />
        <div className="feature-text">{props.featureName}</div>
      </NavLink>
    ) : (
      <ButtonDiv
        className={`feature-item ${props.className}`}
        onClick={this.handleOnClicked}
      >
        <img src={props.image} className="icon" alt="icon" />
        <div className="feature-text">{props.featureName}</div>
      </ButtonDiv>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

FeatureItem.defaultProps = {
  className: '',
  link: '',
  onClick: () => {},
  access: () => true,
};

FeatureItem.propTypes = {
  className: PropTypes.string,
  image: PropTypes.string.isRequired,
  featureName: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  link: PropTypes.string,
  onClick: PropTypes.func,
  access: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(FeatureItem);
