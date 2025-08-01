import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './RemarkCell.scss';

class RemarkCell extends React.PureComponent {
  render() {
    const { props } = this;

    return <div className="remark-cell">{props.cell.value}</div>;
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

RemarkCell.propTypes = {
  cell: PropTypes.objectOf(Object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(RemarkCell);
