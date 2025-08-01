import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import ButtonDiv from '../../ButtonDiv/ButtonDiv';

import ApiService from '../../../../utils/api/ApiService';
import ModalHelper from '../../../../utils/helper/ModalHelper';
import Path from '../../../../utils/path/path';
import QueryType from '../../../../utils/types/QueryType';
import { createQuery } from '../../../../utils/parsers/queryParser';
import { userHasRole } from '../../../../utils/auth/auth';
import { setLoading } from '../../../../store/loading/slice';
import './RegulationActionCell.scss';

class RegulationActionCell extends React.PureComponent {
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
      pathname: Path.editRegulationPath,
      search: query,
    });
  };

  deleteManagement = () => {
    const { props } = this;
    ModalHelper.openDeleteModal({
      deleteFunction: (callback) =>
        ApiService.regulation
          .deleteRegulation(props.cell.row.original.id)
          .then(() => {
            props.setLoading(false);
            this.fetchDataFunction();
            callback();
          }),
    });
  };

  render() {
    const { props } = this;

    return (
      <div className="regulation-action-cell">
        <div className="action-button-container">
          <ButtonDiv
            className="modify-button"
            onClick={this.openEditPage}
            display={userHasRole(69)}
          >
            {props.language.businessManagementActionCell.modify}
          </ButtonDiv>
          <ButtonDiv
            className="delete-button"
            onClick={this.deleteManagement}
            display={userHasRole(71)}
          >
            {props.language.businessManagementActionCell.delete}
          </ButtonDiv>
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

RegulationActionCell.propTypes = {
  language: PropTypes.objectOf(Object).isRequired,
  cell: PropTypes.objectOf(Object).isRequired,
  history: PropTypes.objectOf(Object).isRequired,
  setLoading: PropTypes.func.isRequired,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(RegulationActionCell),
);
