import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './ButtonRow.scss';

class ButtonRow extends React.PureComponent {
  render() {
    const { props } = this;

    return (
      <div className={`button-row ${props.className}`}>{props.children}</div>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

ButtonRow.defaultProps = {
  className: '',
};

ButtonRow.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default connect(mapStateToProps, mapDispatchToProps)(ButtonRow);
