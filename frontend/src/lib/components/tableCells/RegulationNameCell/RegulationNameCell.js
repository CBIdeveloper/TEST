import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import LinkCell from '../LinkCell/LinkCell';

class RegulationNameCell extends React.PureComponent {
  render() {
    const { props } = this;
    const { regulationName, regulationUrl } = props.cell.row.original;

    return <LinkCell title={regulationName} link={regulationUrl} />;
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

RegulationNameCell.propTypes = {
  cell: PropTypes.objectOf(Object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(RegulationNameCell);
