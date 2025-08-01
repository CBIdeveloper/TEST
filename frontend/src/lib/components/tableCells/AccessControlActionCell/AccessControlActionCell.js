import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import ButtonDiv from '../../ButtonDiv/ButtonDiv';

import ApiService from '../../../../utils/api/ApiService';
import ModalHelper from '../../../../utils/helper/ModalHelper';
import Path from '../../../../utils/path/path';
import QueryType from '../../../../utils/types/QueryType';
import UrlParser from '../../../../utils/parsers/urlParser';
import { createQuery } from '../../../../utils/parsers/queryParser';
import { userHasRole } from '../../../../utils/auth/auth';
import { setLoading } from '../../../../store/loading/slice';

import './AccessControlActionCell.scss';

class AccessControlActionCell extends React.PureComponent {
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
        Path.editAccessControlPath,
      ]),
      search: query,
    });
  };

  // TODO: add admin check for delete button...?

  handleDeleteOnClicked = () => {
    ModalHelper.openDeleteModal({
      deleteFunction: this.deleteFunction,
    });
  };

  deleteFunction = (callback) => {
    const { props } = this;
    ApiService.roleMain
      .deleteRoleMain(props.cell.row.original.id)
      .then((response) => {
        props.setLoading(false);
        ModalHelper.openMessageModalByStatus({
          response,
          callback: () => {
            this.fetchDataFunction();
            callback();
          },
        });
      })
      .catch(() => {
        props.setLoading(false);
      });
  };

  render() {
    const { props } = this;

    return (
      <div className="access-control-action-cell">
        <div className="action-button-container">
          <ButtonDiv
            className="modify-button"
            onClick={this.openEditPage}
            display={userHasRole(76)}
          >
            {props.language.accessControlActionCell.management}
          </ButtonDiv>
          {props.cell.row.original.id > 14 ? (
            <ButtonDiv
              className="delete-button"
              onClick={this.handleDeleteOnClicked}
              display={userHasRole(77)}
            >
              {props.language.accessControlActionCell.delete}
            </ButtonDiv>
          ) : null}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  language: state.language.languageInfo.languageObject,
});

const mapDispatchToProps = (dispatch) => ({
  setLoading: (payload) => dispatch(setLoading(payload)),
});

AccessControlActionCell.propTypes = {
  language: PropTypes.objectOf(Object).isRequired,
  cell: PropTypes.objectOf(Object).isRequired,
  history: PropTypes.objectOf(Object).isRequired,
  location: PropTypes.objectOf(Object).isRequired,
  setLoading: PropTypes.func.isRequired,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AccessControlActionCell),
);
