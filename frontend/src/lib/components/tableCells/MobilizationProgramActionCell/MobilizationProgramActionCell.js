import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import ActionCell from '../ActionCell/ActionCell';

import ApiService from '../../../../utils/api/ApiService';
import ModalHelper from '../../../../utils/helper/ModalHelper';
import Path from '../../../../utils/path/path';
import QueryType from '../../../../utils/types/QueryType';
import UrlParser from '../../../../utils/parsers/urlParser';
import { createQuery } from '../../../../utils/parsers/queryParser';
import { userHasRole } from '../../../../utils/auth/auth';
import { setLoading } from '../../../../store/loading/slice';

class MobilizationProgramActionCell extends React.PureComponent {
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
        Path.editMobilizationProgramPath,
      ]),
      search: query,
    });
  };

  deleteFunction = (callback) => {
    const { props } = this;
    ApiService.planMobilizationProgram
      .deletePlanMobilizationProgram(props.cell.row.original.id)
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
    return (
      <ActionCell
        openEditPage={this.openEditPage}
        deleteFunction={this.deleteFunction}
        displayEdit={userHasRole(64)}
        displayDelete={userHasRole(67)}
      />
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  setLoading: (payload) => dispatch(setLoading(payload)),
});

MobilizationProgramActionCell.propTypes = {
  cell: PropTypes.objectOf(Object).isRequired,
  history: PropTypes.objectOf(Object).isRequired,
  location: PropTypes.objectOf(Object).isRequired,
  setLoading: PropTypes.func.isRequired,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MobilizationProgramActionCell),
);
