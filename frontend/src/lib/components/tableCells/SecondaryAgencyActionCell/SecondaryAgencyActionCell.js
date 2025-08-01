import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import ActionCell from '../ActionCell/ActionCell';

import ApiService from '../../../../utils/api/ApiService';
import Path from '../../../../utils/path/path';
import ModalHelper from '../../../../utils/helper/ModalHelper';
import QueryType from '../../../../utils/types/QueryType';
import UrlParser from '../../../../utils/parsers/urlParser';
import { createQuery } from '../../../../utils/parsers/queryParser';
import { userHasRole } from '../../../../utils/auth/auth';

class SecondaryAgencyActionCell extends React.PureComponent {
  constructor(props) {
    super(props);
    const { fetchDataFunction } = props.cell.column.getProps();
    this.fetchDataFunction = fetchDataFunction;
  }

  openEditPage = () => {
    const { props } = this;
    const query = createQuery({
      [QueryType.SECONDARY_ID]: props.cell.row.original.id,
    });
    props.history.push({
      pathname: UrlParser([
        props.location.pathname,
        Path.editSecondaryAgencyPath,
      ]),
      search: query,
    });
  };

  deleteFunction = (callback) => {
    const { props } = this;
    ApiService.secondaryAgency
      .deleteSecondaryAgency(props.cell.row.original.id)
      .then((response) => {
        ModalHelper.openMessageModalByStatus({
          response,
          callback: () => {
            this.fetchDataFunction();
            callback();
          },
        });
      });
  };

  render() {
    return (
      <ActionCell
        openEditPage={this.openEditPage}
        deleteFunction={this.deleteFunction}
        displayEdit={userHasRole(82)}
        displayDelete={userHasRole(83)}
      />
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

SecondaryAgencyActionCell.propTypes = {
  cell: PropTypes.objectOf(Object).isRequired,
  history: PropTypes.objectOf(Object).isRequired,
  location: PropTypes.objectOf(Object).isRequired,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SecondaryAgencyActionCell),
);
