import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Breadcrumb from '../Breadcrumb/Breadcrumb';

import './Container.scss';

class Container extends React.PureComponent {
  render() {
    const { props } = this;

    return (
      <div className={`container ${props.className}`}>
        {props.breadcrumb ? <Breadcrumb /> : ''}
        {props.children}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

Container.defaultProps = {
  breadcrumb: true,
  className: '',
};

Container.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  breadcrumb: PropTypes.bool,
};

export default connect(mapStateToProps, mapDispatchToProps)(Container);
