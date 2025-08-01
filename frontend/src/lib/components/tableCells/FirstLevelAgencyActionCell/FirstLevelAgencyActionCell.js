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

import './FirstLevelAgencyActionCell.scss';

class FirstLevelAgencyActionCell extends React.PureComponent {
  constructor(props) {
    super(props);
    const { fetchDataFunction } = props.cell.column.getProps();
    this.fetchDataFunction = fetchDataFunction;
  }

  openEditPage = () => {
    const { props } = this;
    const { id } = props.cell.row.original;
    const query = createQuery({
      [QueryType.ID]: id,
    });
    props.history.push({
      pathname: Path.secondaryAgencyPath,
      search: query,
    });
  };

  handleDeleteOnClicked = () => {
    ModalHelper.openDeleteModal({
      deleteFunction: this.deleteFunction,
    });
  };

  deleteFunction = (callback) => {
    const { props } = this;
    const { id } = props.cell.row.original;
    ApiService.firstlevelAgency.deleteFirstlevelAgency(id).then(() => {
      callback();
      this.fetchDataFunction();
    });
  };

  render() {
    const { props } = this;

    return (
      <div className="first-level-agency-action-cell">
        <div className="action-button-container">
          <ButtonDiv className="modify-button" onClick={this.openEditPage}>
            {props.language.firstLevelAgencyActionCell.management}
          </ButtonDiv>
          <ButtonDiv
            className="delete-button"
            onClick={this.handleDeleteOnClicked}
            display={userHasRole(31)}
          >
            {props.language.firstLevelAgencyActionCell.delete}
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

FirstLevelAgencyActionCell.propTypes = {
  language: PropTypes.objectOf(Object).isRequired,
  cell: PropTypes.objectOf(Object).isRequired,
  history: PropTypes.objectOf(Object).isRequired,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(FirstLevelAgencyActionCell),
);
