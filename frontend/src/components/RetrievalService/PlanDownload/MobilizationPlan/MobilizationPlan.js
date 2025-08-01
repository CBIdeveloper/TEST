import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import Container from '../../../../lib/components/Container/Container';
import PageTitle from '../../../../lib/components/PageTitle/PageTitle';
import PlanItem from '../PlanItem/PlanItem';

import ApiService from '../../../../utils/api/ApiService';
import MobilizationPlanTable from '../../../../utils/tables/retrievalService/PlanDownload/MobilizationPlanTable';
import ModalHelper from '../../../../utils/helper/ModalHelper';

import './MobilizationPlan.scss';
import ButtonRow from '../../../../lib/components/ButtonRow/ButtonRow';
import ButtonDiv from '../../../../lib/components/ButtonDiv/ButtonDiv';

class MobilizationPlan extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      dataList: [],
    };
  }

  componentDidMount() {
    ApiService.mobilizationPlan.readMobilizationPlan().then((response) => {
      const mobilizationPlanList = response.map((item) => ({
        title: item.planName,
        unit: '',
        value: item.id,
      }));
      this.setDataList(mobilizationPlanList);
    });
  }

  setDataList = (dataList) => {
    this.setState({ dataList });
  };

  handleItemOnClicked = (item) => {
    const { props } = this;
    console.log('item.value', item.value)
    ModalHelper.openTableModal({
      modalTitle: props.language.retrievalService.subMenus.mobilizationPlan,
      sectionTitle: `${props.language.mobilizationPlan.titlePrefix}${item.title}`,
      typeId: item.value,
      TableClass: MobilizationPlanTable,
    });
  };

  render() {
    const { props, state } = this;

    return (
      <Container breadcrumb={false}>
        <div className="mobilization-plan">
          <PageTitle
            title={props.language.retrievalService.subMenus.mobilizationPlan}
          />
          <div className="mobilization-plan-container">
            {state.dataList.map((item) => (
              <PlanItem
                key={item.title}
                color="green"
                title={item.title}
                unit={item.unit}
                onClickFunction={() => this.handleItemOnClicked(item)}
              />
            ))}
          </div>
          <ButtonDiv className="back-button" onClick={props.history.goBack}>
            {props.language.mobilizationPlan.back}
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

MobilizationPlan.propTypes = {
  language: PropTypes.objectOf(Object).isRequired,
  history: PropTypes.objectOf(Object).isRequired,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MobilizationPlan),
);
