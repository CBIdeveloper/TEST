import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';

import ButtonDiv from '../../ButtonDiv/ButtonDiv';

import Path from '../../../../utils/path/path';
import QueryType from '../../../../utils/types/QueryType';
import UrlParser from '../../../../utils/parsers/urlParser';
import {createQuery} from '../../../../utils/parsers/queryParser';
import {userHasRole} from '../../../../utils/auth/auth';

import './PermissionApplicationCell.scss';
import ApiService from "../../../../utils/api/ApiService";
import ModalHelper from "../../../../utils/helper/ModalHelper";

class PermissionApplicationActionCell extends React.PureComponent {
    constructor(props) {
        super(props);
        const {fetchDataFunction} = props.cell.column.getProps();
        this.fetchDataFunction = fetchDataFunction;
    }

    handleViewPage = () => {
        const {props} = this;
        const query = createQuery({
            [QueryType.ID]: props.cell.row.original.id,
        });
        props.history.push({
            pathname: UrlParser([
                props.location.pathname,
                Path.permissionApplicationDetailPath,
            ]),
            search: query,
        });
    };

    handleDelete = () => {
        const {props, state} = this;
        ModalHelper.openDeleteModal({
            deleteFunction: (callback) => {
                ApiService.permissionApplication.deletePermissionApplication(props.cell.row.original.id)
                    .then(() => {
                        callback();
                        this.fetchDataFunction();
                    });
            }
        });
    }

    displayCancelCell = () => {
        const {props} = this;
        const {status} = props.cell.row.original;
        return status === 0 && userHasRole(167);
    }

    render() {
        const {props} = this;

        return (
            <div className="approve-user-action-cell">
                <div className="action-button-container">
                    <ButtonDiv
                        className="view-button"
                        onClick={this.handleViewPage}
                        display={userHasRole(165)}
                    >
                        {props.language.permissionApplicationActionCell.view}
                    </ButtonDiv>
                    <ButtonDiv
                        className="delete-button"
                        onClick={this.handleDelete}
                        display={this.displayCancelCell()}
                    >
                        {props.language.permissionApplicationActionCell.cancel}
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

PermissionApplicationActionCell.propTypes = {
    language: PropTypes.objectOf(Object).isRequired,
    cell: PropTypes.objectOf(Object).isRequired,
    history: PropTypes.objectOf(Object).isRequired,
    location: PropTypes.objectOf(Object).isRequired,
};

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(PermissionApplicationActionCell),
);