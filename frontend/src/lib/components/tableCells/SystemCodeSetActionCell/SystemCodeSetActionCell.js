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

class SystemCodeSetActionCell extends React.PureComponent {
  constructor(props) {
    super(props);
    const { fetchDataFunction } = props.cell.column.getProps();
    this.fetchDataFunction = fetchDataFunction;
  }

  openEditPage = () => {
    const { props } = this;
    const query = createQuery({
      [QueryType.CODE_ID]: props.cell.row.original.id,
    });
    props.history.push({
      pathname: UrlParser([
        props.location.pathname,
        Path.editSystemCodeSetPath,
      ]),
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
      });
  };

  render() {
    return (
      <ActionCell
        openEditPage={this.openEditPage}
        deleteFunction={this.deleteFunction}
        displayEdit={userHasRole(27)}
        displayDelete={userHasRole(28)}
      />
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  setLoading: (payload) => dispatch(setLoading(payload)),
});

SystemCodeSetActionCell.propTypes = {
  cell: PropTypes.objectOf(Object).isRequired,
  history: PropTypes.objectOf(Object).isRequired,
  location: PropTypes.objectOf(Object).isRequired,
  setLoading: PropTypes.func.isRequired,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SystemCodeSetActionCell),
);
