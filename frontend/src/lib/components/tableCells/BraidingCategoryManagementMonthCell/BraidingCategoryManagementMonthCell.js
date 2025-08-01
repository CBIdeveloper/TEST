import React from 'react';
import {connect} from "react-redux";
import PropTypes from 'prop-types';

class BraidingCategoryManagementMonthCell extends React.PureComponent {
    render() {
        const {props} = this;

        return <div>{props.cell.value}{props.cell.value && '個月'}</div>;
    }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

BraidingCategoryManagementMonthCell.propTypes = {
    cell: PropTypes.objectOf(Object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(BraidingCategoryManagementMonthCell);
