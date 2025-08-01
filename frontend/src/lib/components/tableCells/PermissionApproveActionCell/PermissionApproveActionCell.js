import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';

import ButtonDiv from '../../ButtonDiv/ButtonDiv';

import Path from '../../../../utils/path/path';
import QueryType from '../../../../utils/types/QueryType';
import UrlParser from '../../../../utils/parsers/urlParser';
import {createQuery} from '../../../../utils/parsers/queryParser';

import './PermissionApproveActionCell.scss';
import {userHasRole} from "../../../../utils/auth/auth";

class PermissionApproveActionCell extends React.PureComponent {
    constructor(props) {
        super(props);
        const {fetchDataFunction} = props.cell.column.getProps();
        this.fetchDataFunction = fetchDataFunction;
    }

    handleApprovePage = () => {
        const {props} = this;
        const query = createQuery({
            [QueryType.ID]: props.cell.row.original.id,
        });
        props.history.push({
            pathname: UrlParser([
                props.location.pathname,
                Path.permissionApproveDetailPath,
            ]),
            search: query,
        });
    };

    actionCellText = () => {
        const {props} = this;
        const {status} = props.cell.row.original;
        return status === 0
            ? props.language.permissionApproveActionCell.approve
            : props.language.permissionApproveActionCell.view;
    };

    render() {
        return (
            <div className="permission-approve-detail-action-cell">
                <div className="action-button-container">
                    <ButtonDiv
                        className="approve-button"
                        onClick={this.handleApprovePage}
                        display={userHasRole(169)}
                    >
                        {this.actionCellText()}
                    </ButtonDiv>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    language: state.language.languageInfo.languageObject,
});

const mapDispatchToProps = (dispatch) => ({});

PermissionApproveActionCell.propTypes = {
    language: PropTypes.objectOf(Object).isRequired,
    cell: PropTypes.objectOf(Object).isRequired,
    history: PropTypes.objectOf(Object).isRequired,
    location: PropTypes.objectOf(Object).isRequired,
};

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(PermissionApproveActionCell),
);