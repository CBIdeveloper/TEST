import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import ButtonDiv from '../../ButtonDiv/ButtonDiv';

import Path from '../../../../utils/path/path';
import QueryType from '../../../../utils/types/QueryType';
import UrlParser from '../../../../utils/parsers/urlParser';
import { createQuery } from '../../../../utils/parsers/queryParser';
import { userHasRole } from '../../../../utils/auth/auth';

import './ApproveUserActionCell.scss';

class ApproveUserActionCell extends React.PureComponent {
  openApprovePage = () => {
    const { props } = this;
    const query = createQuery({
      [QueryType.ID]: props.cell.row.original.id,
    });
    props.history.push({
      pathname: UrlParser([
        props.location.pathname,
        Path.approveUserDetailPath,
      ]),
      search: query,
    });
  };

  actionCellText = () => {
    const { props } = this;
    const { userAccountAppliedStatus } = props.cell.row.original;
    return userAccountAppliedStatus === 0
      ? props.language.approveUserActionCell.approve
      : props.language.approveUserActionCell.view;
  };

  render() {
    const { props } = this;

    return (
      <div className="approve-user-action-cell">
        <div className="action-button-container">
          <ButtonDiv
            className="approve-button"
            onClick={this.openApprovePage}
            display={userHasRole(86)}
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

ApproveUserActionCell.propTypes = {
  language: PropTypes.objectOf(Object).isRequired,
  cell: PropTypes.objectOf(Object).isRequired,
  history: PropTypes.objectOf(Object).isRequired,
  location: PropTypes.objectOf(Object).isRequired,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ApproveUserActionCell),
);
