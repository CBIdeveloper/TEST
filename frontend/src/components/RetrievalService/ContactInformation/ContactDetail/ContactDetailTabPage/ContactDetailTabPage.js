import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ApiService from '../../../../../utils/api/ApiService';
import ContactDetailItem from './ContactDetailItem/ContactDetailItem';
import SelectInput from '../../../../../lib/components/inputs/SelectInput/SelectInput';
import QueryType from '../../../../../utils/types/QueryType';
import { userHasRole } from '../../../../../utils/auth/auth';

import './ContactDetailTabPage.scss';
//聯絡資訊呼叫API
class ContactDetailTabPage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      contactList: [],
      allContactList: [],
      filterOptionList: [],
      filterValue: '',
      filterReport: '',
      filterPlan: '',
      filterClassification: '',
      filterCity: '',
      filterReportList: [
        { text: '是', value: true },
        { text: '否', value: false },
      ],
      filterPlanList: [],
      filterClassificationList: [],
      filterCityList: [],
    };
  }

  componentDidMount() {
    this.initState();
  }

  componentDidUpdate(prevProps, prevState) {
    const { props } = this;
    if (
      props.query.queryObject !== prevProps.query.queryObject ||
      props.queryId !== prevProps.queryId
    ) {
      this.setContactList([]);
      this.initState();
    }
  }

  setId = (id) => {
    this.setState({ id });
  };

  setContactList = (contactList) => {
    this.setState({ contactList });
  };

  setAllContactList = (allContactList) => {
    this.setState({ allContactList });
  };

  setFilterOptionList = (filterOptionList) => {
    this.setState({ filterOptionList });
  };

  setFilterPlanList = (filterPlanList) => {
    this.setState({ filterPlanList });
  };

  setFilterClassificationList = (filterClassificationList) => {
    this.setState({ filterClassificationList });
  };

  setFilterCityList = (filterCityList) => {
    this.setState({ filterCityList });
  };

  setFilterValue = (filterValue) => {
    const { props, state } = this;
    this.setState({ filterValue });
    // if (state.id === 10) {
    //   ApiService.contactInformation
    //     .readCityUser({ cityId: null })
    //     .then((response) => {
    //       console.log(response);
    //       this.setContactList(response);
    //     });
    if (state.id === 12) {
      ApiService.contactInformation
        .readLevelUser({ levelId: filterValue })
        .then((response) => {
          this.setContactList(response);
          // console.log('LevelUser', response);
        });
    } else if (state.id != 10) {
      ApiService.contactInformation
        .readMobilizationPlanUser({
          mobilizationPlanId: props.queryId,
          mobilizationClassificationId: filterValue,
        })
        .then((response) => {
          this.setContactList(response);
        });
    }
  };

  setFilterReport = (filterReport) => {
    const { props, state } = this;
    this.setState({ filterReport });
    let filteredContactList = state.allContactList;
    if (filterReport !== '') {
      filteredContactList = state.allContactList.filter(
        (contact) => contact.isPlansponsor === filterReport,
      );
    }
    // console.log("setFilterReport1", filteredContactList)
    if (state.filterPlan != '') {
      filteredContactList = filteredContactList.filter((contact) =>
        contact.planId.includes(state.filterPlan),
      );
    }
    // console.log("setFilterReport2", filteredContactList)
    if (state.filterClassification !== '') {
      filteredContactList = filteredContactList.filter((contact) =>
        contact.mobilizationClassificationId.includes(
          state.filterClassification,
        ),
      );
    }
    if (state.filterCity !== '') {
      filteredContactList = filteredContactList.filter(
        (contact) => contact.city === state.filterCity,
      );
    }
    // console.log("setFilterReport3", filteredContactList)
    this.setContactList(filteredContactList);
  };

  setFilterPlan = (filterPlan) => {
    const { props, state } = this;
    this.setState({ filterPlan });
    let filteredContactList = state.allContactList;
    if (filterPlan != '') {
      filteredContactList = state.allContactList.filter((contact) =>
        contact.planId.includes(filterPlan),
      );
    }
    // console.log("setFilterPlan", filteredContactList)
    if (state.filterReport !== '') {
      filteredContactList = filteredContactList.filter(
        (contact) => contact.isPlansponsor === state.filterReport,
      );
    }
    if (state.filterClassification !== '') {
      filteredContactList = filteredContactList.filter((contact) =>
        contact.mobilizationClassificationId.includes(
          state.filterClassification,
        ),
      );
    }
    if (state.filterCity !== '') {
      filteredContactList = filteredContactList.filter(
        (contact) => contact.city === state.filterCity,
      );
    }
    this.setContactList(filteredContactList);
  };

  setFilterClassification = (filterClassification) => {
    const { props, state } = this;
    this.setState({ filterClassification });
    let filteredContactList = state.allContactList;
    if (filterClassification != '') {
      filteredContactList = state.allContactList.filter((contact) =>
        contact.mobilizationClassificationId.includes(filterClassification),
      );
    }
    // console.log("setFilterClassification", filteredContactList)
    if (state.filterReport !== '') {
      filteredContactList = filteredContactList.filter(
        (contact) => contact.isPlansponsor === state.filterReport,
      );
    }
    if (state.filterPlan != '') {
      filteredContactList = filteredContactList.filter((contact) =>
        contact.planId.includes(state.filterPlan),
      );
    }
    if (state.filterCity !== '') {
      filteredContactList = filteredContactList.filter(
        (contact) => contact.city === state.filterCity,
      );
    }
    this.setContactList(filteredContactList);
  };

  setFilterCity = (filterCity) => {
    const { props, state } = this;
    this.setState({ filterCity });
    let filteredContactList = state.allContactList;
    if (filterCity !== '') {
      filteredContactList = state.allContactList.filter(
        (contact) => contact.city === filterCity,
      );
    }
    if (state.filterReport !== '') {
      filteredContactList = filteredContactList.filter(
        (contact) => contact.isPlansponsor === state.filterReport,
      );
    }
    if (state.filterPlan != '') {
      filteredContactList = filteredContactList.filter((contact) =>
        contact.planId.includes(state.filterPlan),
      );
    }
    if (state.filterClassification !== '') {
      filteredContactList = filteredContactList.filter((contact) =>
        contact.mobilizationClassificationId.includes(
          state.filterClassification,
        ),
      );
    }
    this.setContactList(filteredContactList);
  };

  initState = () => {
    const { props } = this;
    const id = Number(props.query.queryObject.get(QueryType.TAB));
    this.setId(id);
    if (id === 1) {
      ApiService.contactInformation.readExecutiveUser().then((response) => {
        console.log(response);
        response.map((item) => {
          if (item.businessPlan === '1') {
            item.mobilizationPlanText = '行政院動員會報';
          } else if (item.businessPlan === '2') {
            item.mobilizationPlanText = item.planName.join(',');
          } else if (item.businessPlan === '3') {
            item.mobilizationPlanText =
              item.mobilizationClassificationName.join(',');
          }
        });
        this.setContactList(response);
      });
    } else if (id === 10) {
      ApiService.contactInformation.readCityUser({}).then((response) => {
        response.map((item) => {
          if (item.isPlansponsor) {
            item.mobilizationPlanText = '地方政府動員會報';
          } else {
            item.mobilizationPlanText = item.planName.join(',');
          }
        });
        this.setContactList(response);
        this.setAllContactList(response);
      });
      ApiService.mobilizationClassification
        .readMobilizationClassification()
        .then((response) => {
          // console.log(response);
          const filterClassificationList = response.map((item) => ({
            text: item.classificationName,
            value: item.id,
          }));
          this.setFilterClassificationList(filterClassificationList);
          let filterPlanList = response.map((item) => ({
            text: item.mobilizationPlan,
            value: item.mobilizationPlanId,
          }));
          filterPlanList = filterPlanList.filter(
            (value, index, self) =>
              index === self.findIndex((t) => t.value === value.value),
          );
          this.setFilterPlanList(filterPlanList);
        });
      ApiService.city.getCityList().then((response) => {
        // console.log(response)
        let filterCityList = response.cityList.map((item) => ({
          text: item.cityName,
          value: item.cityName,
        }));
        this.setFilterCityList(filterCityList);
      });
    } else if (id === 11) {
      ApiService.contactInformation
        .readMaintainManufacturer()
        .then((response) => {
          response.map((item) => {
            item.mobilizationPlanText = '維護廠商';
          });
          this.setContactList(response);
        });
    } else if (id === 12) {
      ApiService.contactInformation.readLevelUser({}).then((response) => {
        // console.log(response)
        response.map((item) => {
          if (item.workPlace.includes('後備')) {
            item.mobilizationPlanText = '戰綜會報';
          } else {
            item.mobilizationPlanText = '軍事動員方案';
          }
        });
        this.setContactList(response);
      });
      ApiService.codefile.getMilitarylevelList().then((response) => {
        const levelList = response.codefileList.map((item) => ({
          text: item.name,
          value: item.id,
        }));
        // console.log(levelList)
        this.setFilterOptionList(levelList);
      });
    } else {
      ApiService.contactInformation
        .readMobilizationPlanUser({ mobilizationPlanId: props.queryId })
        .then((response) => {
          this.setContactList(response);
        });
      ApiService.mobilizationClassification
        .readMobilizationClassificationByPlanId(props.queryId)
        .then((response) => {
          const classificationList = response.map((item) => ({
            text: item.classificationName,
            value: item.id,
          }));
          this.setFilterOptionList(classificationList);
        });
    }
  };

  displayContactList = () => {
    const { props, state } = this;
    // console.log(state.contactList);
    return state.contactList.map((item) => (
      <div>
        <ContactDetailItem
          key={item.name}
          content={item}
          icon={props.icon}
          color={props.color}
        />
      </div>
    ));
  };

  displayFilter = () => {
    const { props, state } = this;
    return props.unitId === 10 ? (
      <div className="filter-container">
        {/* <div>縣市:</div> */}
        <div>篩選:</div>
        <SelectInput
          zenMode
          title=""
          inputName="filterCity"
          inputValue={state.filterCity}
          inputPlaceholder="請選擇縣市"
          setFieldValue={(field, value) => this.setFilterCity(value)}
          options={state.filterCityList}
        />
        {/* <div>動員會報:</div>
        <SelectInput
          zenMode
          title=""
          inputName="filterReport"
          inputValue={state.filterReport}
          inputPlaceholder="請選擇動員會報"
          setFieldValue={(field, value) => this.setFilterReport(value)}
          options={state.filterReportList}
        />
        <div>動員方案:</div>
        <SelectInput
          zenMode
          title=""
          inputName="filterPlan"
          inputValue={state.filterPlan}
          inputPlaceholder="請選擇動員方案"
          setFieldValue={(field, value) => this.setFilterPlan(value)}
          options={state.filterPlanList}
        />
        <div>動員分類:</div>
        <SelectInput
          zenMode
          title=""
          inputName="filterClassification"
          inputValue={state.filterClassification}
          inputPlaceholder="請選擇動員分類"
          setFieldValue={(field, value) => this.setFilterClassification(value)}
          options={state.filterClassificationList}
        /> */}
      </div>
    ) : props.unitId !== 1 && props.unitId !== 11 ? (
      <div className="filter-container">
        <div>{props.language.contactDetailTabPage.filter}</div>
        <SelectInput
          zenMode
          title=""
          inputName="filterValue"
          inputValue={state.filterValue}
          inputPlaceholder={props.language.contactDetailTabPage.filterHint}
          setFieldValue={(field, value) => this.setFilterValue(value)}
          options={state.filterOptionList}
        />
      </div>
    ) : (
      ''
    );
    // return props.unitId !== 1 && props.unitId !== 11 ? (
    //   <div className="filter-container">
    //     <div>{props.language.contactDetailTabPage.filter}</div>
    //     <SelectInput
    //       zenMode
    //       title=""
    //       inputName="filterValue"
    //       inputValue={state.filterValue}
    //       inputPlaceholder={props.language.contactDetailTabPage.filterHint}
    //       setFieldValue={(field, value) => this.setFilterValue(value)}
    //       options={state.filterOptionList}
    //     />
    //   </div>
    // ) : (
    //   ''
    // );
  };

  render() {
    return (
      <div className="contact-detail-tab-page">
        {this.displayFilter()}
        <div className="contact-item-container">
          {this.displayContactList()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  language: state.language.languageInfo.languageObject,
  query: state.route.query,
});

const mapDispatchToProps = (dispatch) => ({});

ContactDetailTabPage.propTypes = {
  language: PropTypes.objectOf(Object).isRequired,
  query: PropTypes.objectOf(Object).isRequired,
  unitId: PropTypes.number.isRequired,
  queryId: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ContactDetailTabPage);
