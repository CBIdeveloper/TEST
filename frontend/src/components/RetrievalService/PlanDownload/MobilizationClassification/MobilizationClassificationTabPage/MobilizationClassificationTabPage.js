import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import PlanItem from '../../PlanItem/PlanItem';

import ApiService from '../../../../../utils/api/ApiService';
import MobilizationClassificationTable from '../../../../../utils/tables/retrievalService/PlanDownload/MobilizationClassificationTable';
import ModalHelper from '../../../../../utils/helper/ModalHelper';

import './MobilizationClassificationTabPage.scss';

class MobilizationClassificationTabPage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { classificationList: [] };
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

  setClassificationList = (classificationList) => {
    this.setState({ classificationList });
  };

  initState = () => {
    const { props } = this;
    ApiService.mobilizationClassification
      .readMobilizationClassificationByPlanId(props.planId)
      .then((response) => {
        this.setClassificationList(response);
      });
  };

  handleItemOnClicked = (item) => {
    const { props } = this;
    ModalHelper.openTableModal({
      modalTitle:
        props.language.retrievalService.subMenus.mobilizationClassification,
      sectionTitle: `${props.language.mobilizationClassification.titlePrefix}${item.classificationName}`,
      typeId: item.id,
      TableClass: MobilizationClassificationTable,
    });
  };

  render() {
    const { props, state } = this;

    return (
      <div className="mobilization-classification-tab-page">
        {state.classificationList.map((item) => (
          <PlanItem
            key={item.id}
            color="red"
            title={item.classificationName}
            // TODO: only for development
            unit={item.mobilizationPlan}
            onClickFunction={() => this.handleItemOnClicked(item)}
          />
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  language: state.language.languageInfo.languageObject,
  query: state.route.query,
});

const mapDispatchToProps = (dispatch) => ({});

MobilizationClassificationTabPage.propTypes = {
  language: PropTypes.objectOf(Object).isRequired,
  query: PropTypes.objectOf(Object).isRequired,
  planId: PropTypes.number.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MobilizationClassificationTabPage);
