import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './FormRow.scss';

class FormRow extends React.PureComponent {
  fitClassname = () => {
    const { props } = this;
    return props.fit ? '' : 'no-fit';
  };

  render() {
    const { props } = this;

    return (
      <div className={`form-row ${this.fitClassname()}`}>{props.children}</div>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

FormRow.defaultProps = {
  fit: true,
};

FormRow.propTypes = {
  children: PropTypes.node.isRequired,
  fit: PropTypes.bool,
};

export default connect(mapStateToProps, mapDispatchToProps)(FormRow);
