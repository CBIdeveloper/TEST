import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import ButtonDiv from '../../ButtonDiv/ButtonDiv';

import ApiService from '../../../../utils/api/ApiService';
import ChangeSysUserStateRequest from '../../../../utils/dataModels/SysUserAccount/ChangeSysUserStateRequest';
import Path from '../../../../utils/path/path';
import ModalHelper from '../../../../utils/helper/ModalHelper';
import QueryType from '../../../../utils/types/QueryType';
import UrlParser from '../../../../utils/parsers/urlParser';
import { createQuery } from '../../../../utils/parsers/queryParser';
import { userHasRole } from '../../../../utils/auth/auth';

import './UserActionCell.scss';

class UserActionCell extends React.PureComponent {
  constructor(props) {
    super(props);
    const { fetchDataFunction } = props.cell.column.getProps();
    this.fetchDataFunction = fetchDataFunction;
  }

  openEditPage = () => {
    const { props } = this;
    const query = createQuery({
      [QueryType.ID]: props.cell.row.original.id,
    });
    props.history.push({
      pathname: UrlParser([
        props.location.pathname,
        Path.editUserManagementPath,
      ]),
      search: query,
    });
  };

  displayActivationButton = () => {
    const { props } = this;
    const { state } = props.cell.row.original;
    if (!userHasRole(154)) return '';
    if (state === '1') {
      return (
        <ButtonDiv
          className="lock-button"
          onClick={this.lockUser}
          display={userHasRole(154)}
        >
          {props.language.userActionCell.lock}
        </ButtonDiv>
      );
    }
    if (state === '2') {
      return (
        <ButtonDiv
          className="lock-button"
          onClick={this.unlockUser}
          display={userHasRole(154)}
        >
          {props.language.userActionCell.unlock}
        </ButtonDiv>
      );
    }
    return '';
  };

  lockUser = () => {
    const { props } = this;
    const request = new ChangeSysUserStateRequest({ state: '2' });
    ModalHelper.openConfirmModal({
      confirmFunction: (callback) => {
        ApiService.sysUserAccount
          .changeSysUserState(props.cell.row.original.id, request)
          .then(() => {
            callback();
            this.fetchDataFunction();
          });
      },
    });
  };

  unlockUser = () => {
    const { props } = this;
    const request = new ChangeSysUserStateRequest({ state: '1' });
    ModalHelper.openConfirmModal({
      confirmFunction: (callback) => {
        ApiService.sysUserAccount
          .changeSysUserState(props.cell.row.original.id, request)
          .then(() => {
            callback();
            this.fetchDataFunction();
          });
      },
    });
  };

  render() {
    const { props } = this;

    return (
      <div className="user-action-cell">
        <div className="action-button-container">
          <ButtonDiv
            className="modify-button"
            onClick={this.openEditPage}
            display={userHasRole(85)}
          >
            {props.language.userActionCell.modify}
          </ButtonDiv>
          {this.displayActivationButton()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  language: state.language.languageInfo.languageObject,
});

const mapDispatchToProps = (dispatch) => ({});

UserActionCell.propTypes = {
  language: PropTypes.objectOf(Object).isRequired,
  cell: PropTypes.objectOf(Object).isRequired,
  history: PropTypes.objectOf(Object).isRequired,
  location: PropTypes.objectOf(Object).isRequired,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(UserActionCell),
);
