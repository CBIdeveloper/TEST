import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import PlanItem from '../../PlanItem/PlanItem';

import ApiService from '../../../../../utils/api/ApiService';
import MobilizationExecutionTable from '../../../../../utils/tables/retrievalService/PlanDownload/MobilizationExecutionTable';
import ModalHelper from '../../../../../utils/helper/ModalHelper';

import './MobilizationExecutionTabPage.scss';

class MobilizationExecutionTabPage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { cityList: [] };
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

  setCityList = (cityList) => {
    this.setState({ cityList });
  };

  initState = () => {
    const { props } = this;
    ApiService.city.readCityByAreaCode(props.districtId).then((response) => {
      const cityList = response.map((item) => ({
        text: item.cityName,
        value: item.id,
      }));
      this.setCityList(cityList);
    });
  };

  handleItemOnClicked = (item) => {
    const { props } = this;
    ModalHelper.openTableModal({
      modalTitle:
        props.language.retrievalService.subMenus.mobilizationExecution,
      sectionTitle: `${props.language.mobilizationExecution.titlePrefix}${item.text}`,
      typeId: item.value,
      TableClass: MobilizationExecutionTable,
    });
  };

  render() {
    const { state } = this;

    return (
      <div className="mobilization-execution-tab-page">
        {state.cityList.map((item) => (
          <PlanItem
            key={item.value}
            color="orange"
            title={item.text}
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

MobilizationExecutionTabPage.propTypes = {
  language: PropTypes.objectOf(Object).isRequired,
  query: PropTypes.objectOf(Object).isRequired,
  districtId: PropTypes.number.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MobilizationExecutionTabPage);
