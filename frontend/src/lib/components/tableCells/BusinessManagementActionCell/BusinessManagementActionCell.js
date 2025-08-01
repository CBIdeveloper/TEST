import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import ButtonDiv from '../../ButtonDiv/ButtonDiv';

import ApiService from '../../../../utils/api/ApiService';
import ModalHelper from '../../../../utils/helper/ModalHelper';
import QueryType from '../../../../utils/types/QueryType';
import UrlParser from '../../../../utils/parsers/urlParser';
import { createQuery } from '../../../../utils/parsers/queryParser';

import './BusinessManagementActionCell.scss';
import { getName } from '../../../../utils/auth/auth';

class BusinessManagementActionCell extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isSign: false,
    };
    const {
      modalTitle,
      fetchDataFunction,
      editPagePath,
      displayEdit,
      displayDelete,
      displayEvaluation,
    } = props.cell.column.getProps();
    this.modalTitle = modalTitle;
    this.fetchDataFunction = fetchDataFunction;
    this.editPagePath = editPagePath;
    if (displayEdit === true || displayEdit === false) {
      this.displayEdit = displayEdit;
    } else {
      this.displayEdit = true;
    }
    if (displayDelete === true || displayDelete === false) {
      this.displayDelete = displayDelete;
    } else {
      this.displayDelete = true;
    }
    if (displayEvaluation === true || displayEvaluation === false) {
      this.displayEvaluation = displayEvaluation;
    } else {
      this.displayEvaluation = true;
    }
  }

  componentDidMount() {
    const { id } = this.props.cell.row.original;
    ApiService.requestSign.getRequestSignList(id).then((res) => {
      const target = res.find((item) => item.name === getName());
      if (target != null) {
        this.setState({ isSign: true });
      } else {
        this.setState({ isSign: false });
      }
    });
  }

  openModal = () => {
    const { props } = this;
    const { id } = props.cell.row.original;
    ModalHelper.openBusinessManagementModal({
      title: this.modalTitle,
      id,
    });
  };

  openSignModal = () => {
    const { props } = this;
    const { id } = props.cell.row.original;
    ModalHelper.openBusinessManagementSignModal({
      title: this.modalTitle,
      id,
    });
  };

  openRequestModal = async () => {
    const { props } = this;
    const { id } = props.cell.row.original;
    const response = await ApiService.request.getRequestList(id);
    const data = await ApiService.requestAnswer.getRequestAnswerList(id);
    const filteredData = data.filter(
      (item) => item.sys_user_account === getName(),
    );
    ModalHelper.openRequestModal({
      response,
      id,
      filteredData,
    });
  };

  openCountModal = async () => {
    const { props } = this;
    const { id } = props.cell.row.original;
    const requestResponse = await ApiService.requestAnswer.getRequestAnswerList(
      id,
    );
    const signResponse = await ApiService.requestSign.getRequestSignList(id);
    ModalHelper.openRequestAnswerModal({
      requestResponse,
      signResponse,
    });
  };

  openEditPage = (id) => {
    const { props } = this;
    const query = createQuery({
      [QueryType.ID]: id,
    });
    props.history.push({
      pathname: UrlParser([props.location.pathname, this.editPagePath]),
      search: query,
    });
  };

  deleteManagement = (id) => {
    ModalHelper.openDeleteModal({
      deleteFunction: (callback) => this.deleteApi({ id, callback }),
    });
  };

  deleteApi = ({ id, callback }) => {
    ApiService.businessManagement.deleteBusinessManagement(id).then(() => {
      this.fetchDataFunction();
      callback();
    });
  };

  displayContent = () => {
    const { props } = this;
    const { id, isSelfCreated } = props.cell.row.original;
    return isSelfCreated ? (
      <>
        <ButtonDiv className="count-button" onClick={this.openCountModal}>
          統計
        </ButtonDiv>
        <ButtonDiv
          className="modify-button"
          onClick={() => this.openEditPage(id)}
        >
          {props.language.businessManagementActionCell.modify}
        </ButtonDiv>
        <ButtonDiv
          className="delete-button"
          onClick={() => this.deleteManagement(id)}
        >
          {props.language.businessManagementActionCell.delete}
        </ButtonDiv>
        <ButtonDiv className="evaluation-button" onClick={this.openModal}>
          {props.language.businessManagementActionCell.open}
        </ButtonDiv>
      </>
    ) : (
      <ButtonDiv className="evaluation-button" onClick={this.openModal}>
        {props.language.businessManagementActionCell.open}
      </ButtonDiv>
    );
  };

  displaySignState = () => {
    const { props } = this;
    const { signState } = props.cell.row.original;
    if (signState == '1') {
      return (
        <ButtonDiv className="sign-button" onClick={this.openSignModal}>
          {props.language.businessManagementActionCell.signState.sign}
        </ButtonDiv>
      );
    } else if (signState == '2') {
      return (
        <ButtonDiv className="alreadyFull-button">
          {props.language.businessManagementActionCell.signState.alreadyFull}
        </ButtonDiv>
      );
    } else if (signState == '3') {
      return (
        <ButtonDiv className="deadline-button">
          {props.language.businessManagementActionCell.signState.deadline}
        </ButtonDiv>
      );
    }
    return '';
  };

  render() {
    const { isSign, meetingEndDate } = this.props.cell.row.original;
    const now = new Date();
    const meetingEndDateObj = new Date(meetingEndDate);
    return (
      <div className="business-management-action-cell">
        <div className="action-button-container">
          {/* {this.displayCount()} */}
          {this.displayContent()}
          {this.displaySignState()}
          {isSign === true && now > meetingEndDateObj && this.state.isSign&& (
            <ButtonDiv
              className="request-button"
              onClick={this.openRequestModal}
            >
              回饋
            </ButtonDiv>
          )}
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

BusinessManagementActionCell.propTypes = {
  language: PropTypes.objectOf(Object).isRequired,
  cell: PropTypes.objectOf(Object).isRequired,
  history: PropTypes.objectOf(Object).isRequired,
  location: PropTypes.objectOf(Object).isRequired,
  setLoading: PropTypes.func.isRequired,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(BusinessManagementActionCell),
);
