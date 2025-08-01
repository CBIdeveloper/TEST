import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { NavLink, withRouter } from 'react-router-dom';
import ButtonDiv from '../../ButtonDiv/ButtonDiv';
import ModalHelper from '../../../../utils/helper/ModalHelper';

import Path from '../../../../utils/path/path';
import QueryType from '../../../../utils/types/QueryType';
import { createQuery } from '../../../../utils/parsers/queryParser';

import './DataSearchActionCell.scss';
import ApiService from '../../../../utils/api/ApiService';

class DataSearchActionCell extends React.PureComponent {
  // constructor(props) {
  //   super(props);
  //   const {
  //     modalTitle,
  //   } = props.cell.column.getProps();
  //   this.modalTitle = modalTitle;
  // }
  // openModal = () => {
  //   const { props } = this;
  //   const { id } = props.cell.row.original;
  //   this.modalTitle = '上傳資料檢視';
  //   ModalHelper.openBraidingItemModal({
  //     title: this.modalTitle,
  //     id,
  //   });
  // };
  openCategoryPage = () => {
    const { props } = this;
    const { id } = props.cell.row.original;
    const query = createQuery({
      [QueryType.ID]: id,
    });
    return `${props.location.pathname}/${Path.categoryDetailPath}${query}`;
  };

  openCriteriaPage = () => {
    const { props } = this;
    const { code } = props.cell.row.original;
    const query = createQuery({
      [QueryType.CODE]: code,
    });
    return `${props.location.pathname}/${Path.criteriaPath}${query}`;
  };

  openModal = async () => {
    const { props } = this;
    const code = props.cell.row.original.code;
    let name2 = props.cell.row.original.name2;
    const formData = new FormData();
    formData.append('code', code);
    formData.append('dataType', 1);
    const cloudDataCount = await ApiService.dataform.getNonCount(formData);
    formData.delete('dataType');
    formData.append('dataType', 2);
    const transCount = await ApiService.dataform.getNonCount(formData);
    formData.delete('dataType');
    formData.append('dataType', 3);
    const troadCount = await ApiService.dataform.getNonCount(formData);
    formData.delete('dataType');
    formData.append('dataType', 4);
    const sftpCount = await ApiService.dataform.getNonCount(formData);
    if (code.startsWith('9') && code.length === 3) {
      name2 = name2 + '(演訓)';
    }
    const sendTime = await ApiService.dataform.getSendTime(formData);
    formData.delete('dataType');
    let count = await ApiService.dataform.getCount(formData);
    let count2 = await ApiService.dataform.getNonCount2(formData);
    if (count == undefined || count == null || count == '') {
      count = 0;
    }
    if (count2 == undefined || count2 == null || count2 == '') {
      count2 = 0;
    }
    const getNonReason = await ApiService.dataform.getNonReason(formData);
    const mergedResult = {};
    getNonReason.forEach((item) => {
      if (mergedResult[item.item1]) {
        mergedResult[item.item1].item2 += item.item2;
      } else {
        mergedResult[item.item1] = { ...item };
      }
    });
    const resultArray = Object.values(mergedResult);
    ModalHelper.openDataformModal({
      name2,
      sendTime,
      cloudDataCount,
      transCount,
      troadCount,
      sftpCount,
      count,
      resultArray,
      count2,
    });
  };

  render() {
    const { props } = this;
    return (
      <div className="data-search-action-cell">
        <div className="action-button-container">
          {/* <NavLink className="action-button" to={this.openCategoryPage()}>
            {props.language.dataSearchActionCell.viewDetail}
          </NavLink> */}

          {/* <ButtonDiv className="evaluation-button" onClick={this.openModal}>
            {props.language.dataSearchActionCell.viewDetail}
          </ButtonDiv> */}
          <NavLink className="action-button" to={this.openCriteriaPage()}>
            {props.language.dataSearchActionCell.criteria}
          </NavLink>
          <ButtonDiv className="action-button" onClick={this.openModal}>
            {'態樣分析'}
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

DataSearchActionCell.propTypes = {
  language: PropTypes.objectOf(Object).isRequired,
  cell: PropTypes.objectOf(Object).isRequired,
  history: PropTypes.objectOf(Object).isRequired,
  location: PropTypes.objectOf(Object).isRequired,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DataSearchActionCell),
);
