import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import ButtonDiv from '../../../../../lib/components/ButtonDiv/ButtonDiv';
import GreySectionTitle from '../../../../../lib/components/GreySectionTitle/GreySectionTitle';
import Memo from '../../../../../lib/components/Memo/Memo';
import SectionTitle from '../../../../../lib/components/SectionTitle/SectionTitle';

import ApiService from '../../../../api/ApiService';
import InformationRetrievalService from '../../../../api/instances/InformationRetrieval/service';
import NumberHelper from '../../../../helper/NumberHelper';

import '../BraidingCategoryMemoModal.scss';

class ModalContent extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { data: null, braidingList: [] };
  }

  async componentDidMount() {
    await ApiService.braidingCategory
      .readBraidingCategory()
      .then(async (braidingList) => {
        await this.setBraidingList(braidingList);

        InformationRetrievalService.getResponsibleInformationRetrievalInformation().then(
          (response) => {
            this.setData(response.data);
          },
        );
      });
  }

  setData = (data) => {
    this.setState({ data });
  };

  setBraidingList = async (braidingList) => {
    await this.setState({ braidingList });
  };

  displayMemo = () => {
    const { props, state } = this;
    if (state.data === null) return '';
    const keys = Object.keys(state.data);
    return keys.map((key) => {
      const data = state.data[key].map((item) => {
        const braidingItem = state.braidingList.find(
          (braiding) => braiding.code === item.code,
        );
        if (braidingItem !== undefined) {
          return {
            ...item,
            name: braidingItem.fullName,
          };
        }
        return item;
      });
      return (
        <Fragment key={key}>
          <GreySectionTitle title={data[0].mobilizationPlan} />
          <div className="memo-section">
            {data.map((item) => (
              <Memo
                key={item.id}
                color="blue"
                content={
                  <div className="memo-content">
                    <div className="category-section">
                      <div>{`${item.mobilizationClassification}${props.language.braidingCategoryMemoModal.plan}`}</div>
                      <div>{item.name}</div>
                    </div>
                    <div className="data-section">
                      <div className="recent-data">
                        <div>
                          {props.language.braidingCategoryMemoModal.latestData}
                        </div>
                        <div className="recent-data-type">
                          {this.displayDataType(item)}
                        </div>
                      </div>
                      <div className="data-count">{this.totalCount(item)}</div>
                      <div className="data-date">{item.dateString}</div>
                    </div>
                    <div
                      className={`memo-status ${this.statusClassname(item)}`}
                    >
                      {this.displayStatus(item)}
                    </div>
                  </div>
                }
              />
            ))}
          </div>
        </Fragment>
      );
    });
  };

  totalCount = ({ totalCount }) =>
    `${NumberHelper.numberWithCommas(totalCount)}筆`;

  displayDataType = ({ isEmpty, isError }) => {
    const { props } = this;
    if (isEmpty) return props.language.braidingCategoryMemoModal.upload;
    return isError
      ? props.language.braidingCategoryMemoModal.upload
      : props.language.braidingCategoryMemoModal.approve;
  };

  statusClassname = ({ isError }) => (isError ? 'error' : '');

  displayStatus = ({ isError, isEmpty }) => {
    const { props } = this;
    if (isEmpty) return props.language.braidingCategoryMemoModal.empty;
    return isError
      ? props.language.braidingCategoryMemoModal.unapproved
      : props.language.braidingCategoryMemoModal.approved;
  };

  render() {
    const { props, state } = this;

    return (
      <div className="braiding-category-memo-modal">
        <SectionTitle title={props.language.braidingCategoryMemoModal.title} />
        <div className="memo-section-container">{this.displayMemo()}</div>
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
