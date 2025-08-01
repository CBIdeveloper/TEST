import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import ButtonDiv from '../../../lib/components/ButtonDiv/ButtonDiv';
import Container from '../../../lib/components/Container/Container';
import PageTitle from '../../../lib/components/PageTitle/PageTitle';
import ResultItem from './ResultItem/ResultItem';
import ResultPlanItem from './ResultPlanItem/ResultPlanItem';

import DataSearchConfig from '../../../utils/config/dataSearch/dataSearchConfig';
import InformationRetrievalService from '../../../utils/api/instances/InformationRetrieval/service';
import QueryType from '../../../utils/types/QueryType';

import './ResultDetail.scss';

class ResultDetail extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      categoryObject: {},
      resultObject: {},
      planList: [],
      configList: [],
      planConfig: {},
    };
  }

  componentDidMount() {
    this.initState();
  }

  componentDidUpdate(prevProps) {
    const { props } = this;
    if (props.query.queryObject !== prevProps.query.queryObject) {
      this.initState();
    }
  }

  setCategoryObject = (categoryObject) => {
    this.setState({ categoryObject });
  };

  setResultObject = (resultObject) => {
    this.setState({ resultObject });
  };

  setPlanList = (planList) => {
    this.setState({ planList });
  };

  setConfigList = (configList) => {
    this.setState({ configList });
  };

  setPlanConfig = (planConfig) => {
    this.setState({ planConfig });
  };

  initState = () => {
    const { props } = this;
    const typeId = props.query.queryObject.get(QueryType.TYPE_ID);
    const detailId = props.query.queryObject.get(QueryType.DETAIL_ID);
    if (typeId !== null && detailId !== null) {
      const configItem = DataSearchConfig.find(
        (item) => item.id === Number(typeId),
      );
      if (configItem !== undefined) {
        const {
          fetchDetailData,
          fetchPlanData,
          planConfigList,
          code,
          planDataModel,
        } = configItem;
        this.setCategoryObject(configItem);
        this.setConfigList(configItem.configList);
        if (planConfigList.length > 0) {
          this.setPlanConfig(planConfigList[0]);
        }
        fetchDetailData(detailId).then((response) => {
          this.setResultObject(response);

          if (fetchPlanData !== null) {
            InformationRetrievalService.getHumanResourceInformationFromHumanResourcePlan(
              {
                braidingCategoryCode: code,
                humanResourcePlanId: detailId,
              },
            ).then((planResponse) => {
              const data = planResponse.planList.map(
                (item) => new planDataModel(item),
              );
              this.setPlanList(data);
            });
          }
        });
      }
    }
  };

  displayContent = () => {
    const { state } = this;
    return state.configList.map((config) => (
      <ResultItem
        key={config.sectionTitle}
        content={state.resultObject}
        config={config}
      />
    ));
  };

  displayPlanContent = () => {
    const { state } = this;
    return state.planList.length > 0 ? (
      <ResultPlanItem planList={state.planList} planConfig={state.planConfig} />
    ) : (
      ''
    );
  };

  render() {
    const { props, state } = this;

    return (
      <div className="result-detail">
        <Container breadcrumb={false}>
          <PageTitle title={props.language.dataSearch.subMenus.resultDetail} />
          <div className="mobilization-container">
            <div className="plan-name">
              {state.categoryObject.mobilizationPlan}
            </div>
            <div className="classification-name">
              {state.categoryObject.mobilizationClassification}
            </div>
            <div className="category-name">{state.categoryObject.name}</div>
          </div>
          {this.displayContent()}
          {this.displayPlanContent()}
          <div className="button-group">
            <ButtonDiv className="back-button" onClick={props.history.goBack}>
              {props.language.resultDetail.back}
            </ButtonDiv>
          </div>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  language: state.language.languageInfo.languageObject,
  query: state.route.query,
});

const mapDispatchToProps = (dispatch) => ({});

ResultDetail.propTypes = {
  language: PropTypes.objectOf(Object).isRequired,
  query: PropTypes.objectOf(Object).isRequired,
  history: PropTypes.objectOf(Object).isRequired,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ResultDetail),
);
