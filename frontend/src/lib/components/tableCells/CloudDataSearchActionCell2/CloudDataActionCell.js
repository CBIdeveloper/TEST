import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { NavLink, withRouter } from 'react-router-dom';
import Path from '../../../../utils/path/path';
import QueryType from '../../../../utils/types/QueryType';
import { createQuery } from '../../../../utils/parsers/queryParser';
import ButtonDiv from '../../ButtonDiv/ButtonDiv';
import ModalHelper from '../../../../utils/helper/ModalHelper';
import axios from 'axios';
// import aaa from '../../../../../src/assets/exportTemplate'
import './CloudDataActionCell.scss';

class CloudDataActionCell extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  openModal = () => {
    const { props } = this;
    const code = props.cell.row.original.code;
    const id = props.cell.row.original.id;
    const name2 = props.cell.row.original.fullName;
    const editAgency = props.cell.row.original.editAgency;
    const transAt = props.cell.row.original.transAt;
    const complianceQuantity = props.cell.row.original.complianceQuantity;
    const nonComplianceQuantity = props.cell.row.original.nonComplianceQuantity;
    const updatedUserAccountId = props.cell.row.original.updatedUserAccountId;
    ModalHelper.openNotCorrectModal({
      id,
      code,
      updatedUserAccountId,
      name2,
      editAgency,
      transAt,
      complianceQuantity,
      nonComplianceQuantity,
    });
  };

  render() {
    const { props } = this;
    return (
      <div className="cloud-data-action-cell">
        <div className="action-button-container">
          <ButtonDiv className="action-button2" onClick={this.openModal}>
            {'不合規原因'}
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

CloudDataActionCell.propTypes = {
  language: PropTypes.objectOf(Object).isRequired,
  cell: PropTypes.objectOf(Object).isRequired,
  history: PropTypes.objectOf(Object).isRequired,
  location: PropTypes.objectOf(Object).isRequired,
};
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CloudDataActionCell),
);
