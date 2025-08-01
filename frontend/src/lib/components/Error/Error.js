import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './Error.scss';

class Error extends React.PureComponent {
  render() {
    const { props } = this;

    return <div className="error-component">{props.message}</div>;
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

Error.propTypes = {
  message: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Error);
