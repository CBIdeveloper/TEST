import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import ActionCell from '../ActionCell/ActionCell';

import ApiService from '../../../../utils/api/ApiService';
import ModalHelper from '../../../../utils/helper/ModalHelper';
import Path from '../../../../utils/path/path';
import QueryType from '../../../../utils/types/QueryType';
import { createQuery } from '../../../../utils/parsers/queryParser';
import { userHasRole } from '../../../../utils/auth/auth';
import { setLoading } from '../../../../store/loading/slice';

class SystemCodeActionCell extends React.PureComponent {
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
      pathname: Path.systemCodeSetPath,
      search: query,
    });
  };

  deleteFunction = (callback) => {
    const { props } = this;
    ApiService.codefile
      .deleteCodefile(props.cell.row.original.id)
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
        displayDelete={userHasRole(28)}
      />
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  setLoading: (payload) => dispatch(setLoading(payload)),
});

SystemCodeActionCell.propTypes = {
  cell: PropTypes.objectOf(Object).isRequired,
  history: PropTypes.objectOf(Object).isRequired,
  setLoading: PropTypes.func.isRequired,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SystemCodeActionCell),
);
