import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import Container from '../../../lib/components/Container/Container';
import PlanDownloadItem from './PlanDownloadItem/PlanDownloadItem';
import PageTitle from '../../../lib/components/PageTitle/PageTitle';

import ApiService from '../../../utils/api/ApiService';
import MobilizationProgramTable from '../../../utils/tables/retrievalService/PlanDownload/MobilizationProgramTable';
import ModalHelper from '../../../utils/helper/ModalHelper';
import PlanDownloadConfig from '../../../utils/config/PlanDownloadConfig';
import UrlParser from '../../../utils/parsers/urlParser';

import './PlanDownload.scss';

class PlanDownload extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { planCount: 0, classificationCount: 0, cityCount: 0 };
  }

  componentDidMount() {
    ApiService.mobilizationPlan.readMobilizationPlan().then((response) => {
      this.setPlanCount(response.length);
    });
    ApiService.mobilizationClassification
      .readMobilizationClassification()
      .then((response) => {
        this.setClassificationCount(response.length);
      });
    ApiService.city.readCity().then((response) => {
      this.setCityCount(response.length);
    });
  }

  setPlanCount = (planCount) => {
    this.setState({ planCount });
  };

  setClassificationCount = (classificationCount) => {
    this.setState({ classificationCount });
  };

  setCityCount = (cityCount) => {
    this.setState({ cityCount });
  };

  countValue = (index) => {
    const { state } = this;
    if (index === 1) return state.planCount;
    if (index === 2) return state.classificationCount;
    if (index === 3) return state.cityCount;
    return 0;
  };

  displayItems = () =>
    PlanDownloadConfig.map((item, index) => (
      <PlanDownloadItem
        key={item.title}
        title={item.title}
        description={item.description(this.countValue(index))}
        image={item.image}
        onClickFunction={() => this.handleDownloadOnClicked(item)}
        color={item.color}
      />
    ));

  handleDownloadOnClicked = (item) => {
    const { props } = this;
    if (item.type === 'link') {
      props.history.push(UrlParser([props.location.pathname, item.path]));
    } else {
      ModalHelper.openTableModal({
        modalTitle:
          props.language.retrievalService.subMenus.mobilizationProgram,
        sectionTitle:
          props.language.retrievalService.subMenus.mobilizationProgram,
        typeId: 0,
        TableClass: MobilizationProgramTable,
      });
    }
  };

  render() {
    const { props } = this;

    return (
      <Container breadcrumb={false}>
        <div className="plan-download">
          <PageTitle
            title={props.language.retrievalService.subMenus.planDownload}
          />
          <div className="plan-download-container">{this.displayItems()}</div>
        </div>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  language: state.language.languageInfo.languageObject,
});

const mapDispatchToProps = (dispatch) => ({});

PlanDownload.propTypes = {
  language: PropTypes.objectOf(Object).isRequired,
  history: PropTypes.objectOf(Object).isRequired,
  location: PropTypes.objectOf(Object).isRequired,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PlanDownload),
);
