import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import ButtonDiv from '../../../../lib/components/ButtonDiv/ButtonDiv';
import Container from '../../../../lib/components/Container/Container';
import MobilizationClassificationTabPage from './MobilizationClassificationTabPage/MobilizationClassificationTabPage';
import PageTitle from '../../../../lib/components/PageTitle/PageTitle';
import Tabs from '../../../../lib/components/Tabs/Tabs';

import ApiService from '../../../../utils/api/ApiService';
import QueryType from '../../../../utils/types/QueryType';

import './MobilizationClassification.scss';

class MobilizationClassification extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { planList: [] };
  }

  componentDidMount() {
    ApiService.mobilizationPlan.readMobilizationPlan().then((response) => {
      this.setPlanList(response);
    });
  }

  setPlanList = (planList) => {
    this.setState({ planList });
  };

  tabContentList = () => {
    const { state } = this;
    return state.planList.map((item) => ({
      name: item.planName,
      value: item.id.toString(),
      Component: MobilizationClassificationTabPage,
      componentProps: {
        planId: item.id,
      },
    }));
  };

  render() {
    const { props, state } = this;

    if (state.planList.length === 0) return '';

    return (
      <Container breadcrumb={false}>
        <div className="mobilization-classification">
          <PageTitle
            title={
              props.language.retrievalService.subMenus
                .mobilizationClassification
            }
          />
          <Tabs
            queryKey={QueryType.TAB}
            tabContentList={this.tabContentList()}
            colorList={['red']}
          />
          <ButtonDiv className="back-button" onClick={props.history.goBack}>
            {props.language.mobilizationClassification.back}
          </ButtonDiv>
        </div>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  language: state.language.languageInfo.languageObject,
});

const mapDispatchToProps = (dispatch) => ({});

MobilizationClassification.propTypes = {
  language: PropTypes.objectOf(Object).isRequired,
  history: PropTypes.objectOf(Object).isRequired,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MobilizationClassification),
);
