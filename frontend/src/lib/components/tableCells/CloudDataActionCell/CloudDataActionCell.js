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
  openModal = () => {
    const { props } = this;
    const { id } = props.cell.row.original;
    ModalHelper.openImportModal({
      title: '資料匯入',
      id,
    });
  };

  exportExcel = () => {
    const { props } = this;
    const { name2 } = props.cell.row.original;
    // window.open(
    //   `../../documents/exportTemplate/` + name2 + '.xlsx',
    //   'noreferrer',
    // );
    /**發佈 */
    window.open(
      `../documents/exportTemplate/` + name2 + '.xlsx',
      'noreferrer',
    );
  };

  openCriteriaPage = () => {
    const { props } = this;
    const { code } = props.cell.row.original;
    const query = createQuery({
      [QueryType.CODE]: code,
    });
    return `${props.location.pathname}/${Path.criteriaPath}${query}`;
  };

  render() {
    const { props } = this;
    return (
      <div className="cloud-data-action-cell">
        <div className="action-button-container">
          <NavLink className="action-button" to={this.openCriteriaPage()}>
            {props.language.cloudDataActionCell.criteria}
          </NavLink>
          <ButtonDiv className="action-button2" onClick={this.exportExcel}>
            {props.language.cloudDataActionCell.template}
          </ButtonDiv>
          {/* <ButtonDiv className="i-button" onClick={this.openModal}>
            {props.language.cloudDataActionCell.import}
          </ButtonDiv> */}
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
