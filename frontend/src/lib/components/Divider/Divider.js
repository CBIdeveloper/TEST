import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './Divider.scss';

class Divider extends React.PureComponent {
  render() {
    const { props } = this;

    return <div className="divider" />;
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

Divider.propTypes = {};

export default connect(mapStateToProps, mapDispatchToProps)(Divider);
