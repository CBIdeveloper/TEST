import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './ModificationSearchDescriptionCell.scss';

class ModificationSearchDescriptionCell extends React.PureComponent {
    render() {
        const { props } = this;

        return <div className="description-cell">{props.cell.value}</div>;
    }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

ModificationSearchDescriptionCell.propTypes = {
    cell: PropTypes.objectOf(Object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ModificationSearchDescriptionCell);
