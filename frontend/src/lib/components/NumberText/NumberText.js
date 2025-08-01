import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import NumberHelper from '../../../utils/helper/NumberHelper';

class NumberText extends React.PureComponent {
  render() {
    const { props } = this;

    return <div>{NumberHelper.numberWithCommas(props.value)}</div>;
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

NumberText.defaultProps = {
  value: '',
};

NumberText.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default connect(mapStateToProps, mapDispatchToProps)(NumberText);
