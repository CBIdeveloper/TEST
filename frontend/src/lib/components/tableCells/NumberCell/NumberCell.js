import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import NumberText from '../../NumberText/NumberText';

class NumberCell extends React.PureComponent {
  render() {
    const { props } = this;

    return <NumberText value={props.cell.value} />;
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

NumberCell.propTypes = {
  cell: PropTypes.objectOf(Object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(NumberCell);
