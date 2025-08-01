import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import ButtonDiv from '../../../../../lib/components/ButtonDiv/ButtonDiv';
import GreySectionTitle from '../../../../../lib/components/GreySectionTitle/GreySectionTitle';
import Memo from '../../../../../lib/components/Memo/Memo';
import SectionTitle from '../../../../../lib/components/SectionTitle/SectionTitle';

import ApiService from '../../../../api/ApiService';
import DateHelper from '../../../../helper/DateHelper';
import { dateObjectToDateString } from '../../../../parsers/dateParser';

import '../PlanUpdateMemoModal.scss';

class ModalContent extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      programList: [],
      planList: [],
      classificationList: [],
      executionList: [],
    };
  }

  componentDidMount() {
    const searchDate = DateHelper.addDays(new Date(), -30);
    const searchDateString = dateObjectToDateString(searchDate);

    ApiService.planMobilizationProgram
      .readPlanMobilizationProgramForMemo(searchDateString)
      .then((response) => {
        this.setProgramList(response);
      });

    ApiService.planMobilizationPlan
      .readPlanMobilizationPlanForMemo(searchDateString)
      .then((response) => {
        this.setPlanList(response);
      });

    ApiService.planMobilizationClassification
      .readPlanMobilizationClassificationForMemo(searchDateString)
      .then((response) => {
        this.setClassificationList(response);
      });

    ApiService.planMobilizationExecution
      .readPlanMobilizationExecutionForMemo(searchDateString)
      .then((response) => {
        this.setExecutionList(response);
      });
  }

  setProgramList = (programList) => {
    this.setState({ programList });
  };

  setPlanList = (planList) => {
    this.setState({ planList });
  };

  setClassificationList = (classificationList) => {
    this.setState({ classificationList });
  };

  setExecutionList = (executionList) => {
    this.setState({ executionList });
  };

  displayProgram = () => {
    const { props, state } = this;
    return state.programList.length > 0 ? (
      <>
        <GreySectionTitle title={props.language.planUpdateMemoModal.program} />
        <div className="memo-section">
          {state.programList.map((item) => (
            <Memo
              key={item.id}
              color="green"
              content={
                <div className="memo-content">
                  <div className="memo-title">
                    {item.mobilizationProgramSubject}
                  </div>
                  <div className="memo-date">
                    <div>{props.language.planUpdateMemoModal.updateDate}</div>
                    <div>{item.updatedAtString}</div>
                  </div>
                </div>
              }
            />
          ))}
        </div>
      </>
    ) : (
      ''
    );
  };

  displayPlan = () => {
    const { props, state } = this;
    return state.planList.length > 0 ? (
      <>
        <GreySectionTitle title={props.language.planUpdateMemoModal.plan} />
        <div className="memo-section">
          {state.planList.map((item) => (
            <Memo
              key={item.id}
              color="green"
              content={
                <div className="memo-content">
                  <div className="memo-title">
                    {item.mobilizationPlanSubject}
                  </div>
                  <div className="memo-date">
                    <div>{props.language.planUpdateMemoModal.updateDate}</div>
                    <div>{item.updatedAtString}</div>
                  </div>
                </div>
              }
            />
          ))}
        </div>
      </>
    ) : (
      ''
    );
  };

  displayClassification = () => {
    const { props, state } = this;
    return state.classificationList.length > 0 ? (
      <>
        <GreySectionTitle
          title={props.language.planUpdateMemoModal.classification}
        />
        <div className="memo-section">
          {state.classificationList.map((item) => (
            <Memo
              key={item.id}
              color="green"
              content={
                <div className="memo-content">
                  <div className="memo-title">
                    {item.mobilizationClassificationSubject}
                  </div>
                  <div className="memo-date">
                    <div>{props.language.planUpdateMemoModal.updateDate}</div>
                    <div>{item.updatedAtString}</div>
                  </div>
                </div>
              }
            />
          ))}
        </div>
      </>
    ) : (
      ''
    );
  };

  displayExecution = () => {
    const { props, state } = this;
    return state.executionList.length > 0 ? (
      <>
        <GreySectionTitle
          title={props.language.planUpdateMemoModal.execution}
        />
        <div className="memo-section">
          {state.executionList.map((item) => (
            <Memo
              key={item.id}
              color="green"
              content={
                <div className="memo-content">
                  <div className="memo-title">
                    {item.mobilizationExecutionSubject}
                  </div>
                  <div className="memo-date">
                    <div>{props.language.planUpdateMemoModal.updateDate}</div>
                    <div>{item.updatedAtString}</div>
                  </div>
                </div>
              }
            />
          ))}
        </div>
      </>
    ) : (
      ''
    );
  };

  render() {
    const { props, state } = this;

    return (
      <div className="plan-update-memo-modal">
        <SectionTitle title={props.language.planUpdateMemoModal.title} />
        <div className="memo-section-container">
          {this.displayProgram()}
          {this.displayPlan()}
          {this.displayClassification()}
          {this.displayExecution()}
        </div>
        <div className="action-button-container">
          <ButtonDiv className="close-button" onClick={props.onClose}>
            {props.language.tableModal.close}
          </ButtonDiv>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

ModalContent.propTypes = {
  language: PropTypes.objectOf(Object).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ModalContent),
);
