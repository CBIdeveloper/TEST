import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Container from '../../../lib/components/Container/Container';
import PageTitle2 from '../../../lib/components/PageTitle/PageTitle2';

import ApiService from '../../../utils/api/ApiService';
import QueryType from '../../../utils/types/QueryType';
import { createQuery } from '../../../utils/parsers/queryParser';
import { getCityId, getUserId, getAgencyType, getAccessToken } from '../../../utils/auth/auth';

import './Dashboard.scss';

class Dashboard extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      userData: null,
      isPlainCode: null,
      MappingCityData: null,
      cityId: null,
    };
  }

  componentDidMount() {
    ApiService.sysUserAccount
      .readSysUserAccountById(getUserId())
      .then((response) => {
        this.setUserData(response);
        // console.log(response.cityId);
        this.setCityId(response.cityId);
      });

    ApiService.permissionApplication.readPlainCode().then((response) => {
      const { data } = response;
      const isPlainCode = Boolean(data.is_plain_code) ? 1 : 0;
      this.setIsPlainCode(isPlainCode);
    });

    /* 等析數修正好儀表板
    const url = `${dashboardLink.url}`;
    // const url = `https://172.22.13.206:8443/mstr/reporfuntion.jsp`;
    const token = getAccessToken();
  
    const form = document.createElement("form");
    form.method = "POST";
    form.action = url;
    form.target = "DashboardIframe";
  
    const field1 = document.createElement("input");
    field1.type = "hidden";
    field1.name = "token";
    field1.value = token;
    form.appendChild(field1);
  
    const field2 = document.createElement("input");
    field2.type = "hidden";
    field2.name = "obj_type";
    field2.value = "rep";
    form.appendChild(field2);
  
    // 將表單加到 DOM，然後提交
    document.body.appendChild(form);
    form.submit();
    document.body.removeChild(form);
    */
  }

  setUserData = (userData) => {
    this.setState({ userData });
    // console.log(userData.militaryagencyId);
    if (
      getAgencyType() == '4' &&
      userData.militaryagencyId != null &&
      userData.militaryagencyId != ''
    ) {
      ApiService.militaryCityMapping
        .getMilitaryCityMappingList(userData.militaryagencyId)
        .then((response) => {
          this.setMappingCityData(response.data);
        });
    }
  };

  setIsPlainCode = (isPlainCode) => {
    this.setState({ isPlainCode });
  };

  setMappingCityData = (MappingCityData) => {
    this.setState({ MappingCityData });
  };

  setCityId = (cityId) => {
    // console.log(cityId);
    this.setState({ cityId });
  };

  iframeLink = () => {
    const { state } = this;
    const {
      agencyType,
      businessPlan,
      braidingCategoryCodeList,
      mobilizationType,
      mobilizationPlanId,
    } = state.userData;
    // console.log(state.MappingCityData)
    const query = createQuery({
      [QueryType.ID]: getUserId(),
      [QueryType.BUSINESS_PLAN]: businessPlan,
      [QueryType.MOBILIZATION_PLAN_ID]:
        businessPlan === '2' ? mobilizationPlanId : '',
      [QueryType.BRAIDING_CATEGORY]: braidingCategoryCodeList,
      [QueryType.MOBILIZATION_TYPE_ID]:
        mobilizationType === '' || mobilizationType === null
          ? ''
          : mobilizationType,
      [QueryType.IS_PLAIN_CODE]: state.isPlainCode,
      [QueryType.OBJ_TYPE]: 'rep',
      [QueryType.CITY]:
        agencyType === '2' ? getCityId() : state.MappingCityData,
    });
    console.log(query);
    // return 'https://172.22.13.206:8443/mstr/reporfuntion.jsp/';
    return `${dashboardLink.url}${query}`;
  };
  sandboxConfig = () => {
    return "allow-scripts allow-same-origin allow-forms allow-popups";
  }

  render() {
    const { props, state } = this;

    if (state.userData === null) return '';

    return (
      <Container className="dashboard">
        <div className="dashboard-content">
          <PageTitle2
            title={props.language.mobilizationEnergy.subMenus.dashboard}
            breadcrumb={false}
          />
          <iframe
            name="DashboardIframe"
            title="Dashboard"
            className="dashboard-iframe"
            src={this.iframeLink()}
            sandbox={this.sandboxConfig()}
          />
        </div>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  language: state.language.languageInfo.languageObject,
});

const mapDispatchToProps = (dispatch) => ({});

Dashboard.propTypes = {
  language: PropTypes.objectOf(Object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
